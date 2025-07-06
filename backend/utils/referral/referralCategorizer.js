// Utility to load and cache domain lists for referral categorization
const fs = require('fs');
const path = require('path');

let socialDomains = null;
let searchEngines = null;

function loadList(filename) {
  const filePath = path.join(__dirname, filename);
  return fs.readFileSync(filePath, 'utf-8')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('#'));
}

function getSocialDomains() {
  if (!socialDomains) {
    socialDomains = loadList('social_domains.txt');
  }
  return socialDomains;
}

function getSearchEngines() {
  if (!searchEngines) {
    searchEngines = loadList('search_engines.txt');
  }
  return searchEngines;
}

function categorizeReferral(ref) {
  if (!ref || ref === '' || ref === '(direct)') return 'direct';
  const social = getSocialDomains();
  const search = getSearchEngines();
  if (social.some(domain => ref.includes(domain))) return 'social';
  if (search.some(domain => ref.includes(domain))) return 'organic';
  return 'other';
}

module.exports = { getSocialDomains, getSearchEngines, categorizeReferral };
