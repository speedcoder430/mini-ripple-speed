const { isbot } = require("isbot");

// Level 1: User-Agent detection
function detectBotByUserAgent(userAgent) {
  return isbot(userAgent);
}

// Level 2: Honeypot detection
function detectBotByHoneypot(honeypotValue, honeypotTriggered) {
  return honeypotTriggered || (typeof honeypotValue === 'string' && honeypotValue.trim().length > 0);
}

// Level 3: Behavioral detection
function detectBotByBehavior({ mouseMoves, clicks, scrollDepth, idleTime, sessionDuration }) {
  let riskScore = 0;

  if (mouseMoves < 3) riskScore += 3;
  if (clicks === 0) riskScore += 2;
  if (scrollDepth < 10) riskScore += 2;
  if (idleTime > sessionDuration * 0.8) riskScore += 3;

  // Optional: add more signals if needed
  const isLikelyBot = riskScore >= 5;

  return { isLikelyBot, riskScore };
}

// Central detection controller
function detectBotLevel({
  userAgent,
  honeypotValue,
  honeypotTriggered,
  mouseMoves = 0,
  clicks = 0,
  scrollDepth = 0,
  idleTime = 0,
  sessionStartTime,
  endTime = new Date()
}) {
  const sessionDuration = (new Date(endTime) - new Date(sessionStartTime)) / 1000; // in seconds

  // Level 1
  if (detectBotByUserAgent(userAgent)) return { isBot: true, level: 1, riskScore: 10 };

  // Level 2
  if (detectBotByHoneypot(honeypotValue, honeypotTriggered)) return { isBot: true, level: 2, riskScore: 9 };

  // Level 3
  const behaviorResult = detectBotByBehavior({ mouseMoves, clicks, scrollDepth, idleTime, sessionDuration });
  if (behaviorResult.isLikelyBot) return { isBot: true, level: 3, riskScore: behaviorResult.riskScore };

  return { isBot: false, level: null, riskScore: behaviorResult.riskScore };
}

module.exports = {
  detectBotByUserAgent,
  detectBotByHoneypot,
  detectBotByBehavior,
  detectBotLevel
};
