const express = require("express");
const router = express.Router();
const visitorController = require("../controllers/visitor.controller");


// POST /api/v2/visitor/track
router.post("/track", visitorController.trackVisitor);

// POST /api/v2/visitor/session-start
router.post("/session-start", visitorController.createVisitorSession);

// POST /api/v2/visitor/log
router.post("/log", visitorController.logPageView);

// POST /api/v2/visitor/session-end
router.post("/session-end", visitorController.endVisitorSession);

// POST /api/v2/visitor/heartbeat
router.post("/heartbeat", visitorController.heartbeat);

module.exports = router;
