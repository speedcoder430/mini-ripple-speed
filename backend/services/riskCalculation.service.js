exports.calculateRisk = ({ isBot, isVPN, frequency, geoMismatch }) => {
  let score = 0;
  if (isBot) score += 50;
  if (isVPN) score += 30;
  if (frequency > 100) score += 20;
  if (geoMismatch) score += 10;
  return score;
};

exports.isSuspicious = (riskScore, threshold = 50) => {
  return riskScore >= threshold;
};
