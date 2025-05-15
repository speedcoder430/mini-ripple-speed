const IPinfo = require('ipinfo');
const BlockedCountry = require('../models/blockedCountry');

// Initialize IPinfo with your token
const ipinfo = new IPinfo(process.env.IPINFO_TOKEN);

const countryBlocker = async (req, res, next) => {
    try {
        // Skip blocking for admin routes
        if (req.path.startsWith('/api/admin')) {
            return next();
        }

        // Get client IP address
        const ip = req.ip ||
            req.headers['x-forwarded-for']?.split(',')[0] ||
            req.socket.remoteAddress;

        // Get location data from IPinfo
        const ipData = await ipinfo.lookupIp(ip);
        const countryCode = ipData.country;

        // Check if country is blocked
        const blockedCountry = await BlockedCountry.findOne({
            countryCode,
            isBlocked: true
        });

        if (blockedCountry) {
            // Check if there's a valid override
            if (blockedCountry.overrideExpiry && blockedCountry.overrideExpiry > new Date()) {
                return next();
            }

            // Return blocked access response
            return res.status(403).json({
                error: 'Access Denied',
                message: 'This service is not available in your country.',
                countryCode: countryCode
            });
        }

        next();
    } catch (error) {
        console.error('Country blocking error:', error);
        // In case of error, allow the request to proceed
        next();
    }
};

module.exports = countryBlocker; 