const fs = require("fs");
const path = require("path");
const ipRangeCheck = require("ip-range-check");
const geoip = require("geoip-lite");
const dns = require("dns").promises;
const ct = require("countries-and-timezones");

// Load VPN IP ranges from file (once)
let vpnRanges = null;
function loadVpnRanges() {
  if (vpnRanges) return vpnRanges;
  const filePath = path.join(__dirname, "vpn-ip-lists", "vpn-ip-ranges.txt");
  if (!fs.existsSync(filePath)) {
    vpnRanges = [];
    return vpnRanges;
  }
  vpnRanges = fs.readFileSync(filePath, "utf-8")
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean);
  return vpnRanges;
}

// Load suspicious hostnames for reverse DNS (once)
let suspiciousHostnames = null;
function loadSuspiciousHostnames() {
  if (suspiciousHostnames) return suspiciousHostnames;
  const filePath = path.join(__dirname, "vpn-ip-lists", "suspicious-hostnames.txt");
  if (!fs.existsSync(filePath)) {
    suspiciousHostnames = [];
    return suspiciousHostnames;
  }
  suspiciousHostnames = fs.readFileSync(filePath, "utf-8")
    .split("\n")
    .map(line => line.trim().toLowerCase())
    .filter(Boolean);
  return suspiciousHostnames;
}

// Level 1: VPN IP range match
function isVpnByIpRange(ip) {
  const ranges = loadVpnRanges();
  return ipRangeCheck(ip, ranges);
}

// Level 2: Reverse DNS lookup check against suspicious hostnames
async function isVpnByReverseDns(ip) {
  try {
    const hostnames = await dns.reverse(ip);
    const suspiciousList = loadSuspiciousHostnames();
    return hostnames.some(hostname =>
      suspiciousList.some(suspicious => hostname.toLowerCase().includes(suspicious))
    );
  } catch {
    return false;
  }
}

// Level 3: Timezone-country mismatch check
function isVpnByTimezoneMismatch(ip, browserTimezone) {
  if (!browserTimezone) return false;
  const geo = geoip.lookup(ip);
  if (!geo || !geo.country) return false;

  const countryFromIP = geo.country.toUpperCase();
  const tzInfo = ct.getTimezone(browserTimezone);
  if (!tzInfo || !tzInfo.countries || tzInfo.countries.length === 0) return false;

  const matches = tzInfo.countries.some(c => c.toUpperCase() === countryFromIP);
  return !matches;
}

// Central layered VPN detection controller
async function detectVPN(ip, browserTimezone) {
  const result = {
    isInVpnList: false,
    reverseDnsSuspicious: false,
    timezoneMismatch: false,
    geoInfo: geoip.lookup(ip),
    isVPN: false,
    level: null
  };

  // Level 1: IP Range match
  if (isVpnByIpRange(ip)) {
    result.isInVpnList = true;
    result.isVPN = true;
    result.level = 1;
    return result;
  }

  // Level 2: Reverse DNS check
  if (await isVpnByReverseDns(ip)) {
    result.reverseDnsSuspicious = true;
    result.isVPN = true;
    result.level = 2;
    return result;
  }

  // Level 3: Timezone mismatch
  if (isVpnByTimezoneMismatch(ip, browserTimezone)) {
    result.timezoneMismatch = true;
    result.isVPN = true;
    result.level = 3;
    return result;
  }

  // No VPN indicators
  return result;
}

module.exports = {
  isVpnByIpRange,
  isVpnByReverseDns,
  isVpnByTimezoneMismatch,
  detectVPN
};
