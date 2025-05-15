const UAParser = require('ua-parser-js');
const DeviceBlock = require('../models/deviceBlock');
const DeviceLog = require('../models/deviceLog');

const deviceDetectionMiddleware = async (req, res, next) => {
    try {
        const parser = new UAParser(req.headers['user-agent']);
        const result = parser.getResult();

        // Determine device type
        let deviceType = 'desktop';
        if (result.device.type === 'mobile' || result.device.type === 'phone') {
            deviceType = 'mobile';
        } else if (result.device.type === 'tablet') {
            deviceType = 'tablet';
        }

        // Add device info to request object
        req.deviceInfo = {
            type: deviceType,
            details: {
                browser: result.browser.name,
                browserVersion: result.browser.version,
                os: result.os.name,
                osVersion: result.os.version,
                device: result.device.model || 'unknown',
                vendor: result.device.vendor || 'unknown'
            }
        };

        // Skip device blocking check for authentication routes
        if (req.path.startsWith('/api/auth')) {
            return next();
        }

        // Check if user is authenticated
        const userId = req.user?.uid;
        if (!userId) {
            return next();
        }

        // Check if device type is blocked for this user
        const blockRule = await DeviceBlock.findOne({
            userId,
            isActive: true,
            blockedDeviceTypes: deviceType
        });

        // Log the access attempt
        await DeviceLog.create({
            userId,
            deviceType,
            userAgent: req.headers['user-agent'],
            deviceDetails: req.deviceInfo.details,
            ipAddress: req.ip,
            wasBlocked: !!blockRule
        });

        if (blockRule) {
            return res.status(403).json({
                status: 'error',
                message: 'Access denied: Your device type is blocked by the administrator.',
                deviceType
            });
        }

        next();
    } catch (error) {
        console.error('Device detection error:', error);
        next(error);
    }
};

module.exports = deviceDetectionMiddleware; 