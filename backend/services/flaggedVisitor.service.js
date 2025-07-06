// Service to determine if a visitor session should be flagged
// Usage: const { shouldFlagVisitor } = require('./flaggedVisitor.service');

module.exports.shouldFlagVisitor = (session, vpnDetectionResult) => {
  const reasons = [];
  const now = Date.now();
  const sessionStart = session.startTime ? new Date(session.startTime).getTime() : null;
  const sessionDuration = sessionStart ? (now - sessionStart) / 1000 : null; // seconds

  // 1. Honeypot
  if (session.honeypotTriggered) reasons.push('honeypot');

  // 2. Risk Score
  if (session.riskScore >= 7) reasons.push('risk_score');

  // 3. Bot Detection
  if (session.isBot) reasons.push('bot');

  // 4. Automation thresholds
  if (sessionDuration && session.clicks > 20 && sessionDuration <= 60) reasons.push('automation_clicks');
  if (sessionDuration && session.pageViews > 10 && sessionDuration <= 60) reasons.push('automation_pageviews');
  if (sessionDuration && session.mouseMoves > 200 && sessionDuration <= 60) reasons.push('automation_mousemoves');
  if (session.idleTime && session.idleTime < 2) reasons.push('low_idle_time');

  // 5. VPN + Timezone Mismatch
  if (session.isVPN && vpnDetectionResult?.timezoneMismatch) reasons.push('vpn_timezone_mismatch');

  return {
    isFlagged: reasons.length > 0,
    flagReasons: reasons
  };
};
