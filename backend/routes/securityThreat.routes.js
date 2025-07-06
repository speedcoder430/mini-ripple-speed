const express = require('express');
const router = express.Router();
const securityThreatController = require('../controllers/securityThreat.controller');
const auth = require('../middleware/auth.middleware');

router.use(auth);

// Metrics cards (bots, vpn, abnormal traffic)
router.get('/metrics', securityThreatController.getMetricsCards);

// Bot/VPN detection summary (for chart)
router.get('/bots-vpn-summary', securityThreatController.getBotsVpnSummary);

// Repeated offenders & high-frequency visitors
router.get('/repeated-offenders', securityThreatController.getRepeatedOffendersAndHighFrequencyVisitors);

// Traffic anomalies & risk analysis table
router.get('/anomalies', securityThreatController.getTrafficAnomalies);

// Suspicious IPs
router.get('/suspicious-ips', securityThreatController.getSuspiciousIps);

// Run suspicious IP detection (can be called with ?ip=1.2.3.4 to check specific IP)
router.get('/detect-suspicious-ips', securityThreatController.runSuspiciousIpDetection);

// Security threat summary (all metrics, offenders, anomalies, blocks, suspicious IPs)
router.get('/summary', securityThreatController.getSecurityThreatSummary);

module.exports = router;
