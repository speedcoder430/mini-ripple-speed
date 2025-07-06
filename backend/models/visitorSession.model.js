const mongoose = require("mongoose");

const visitorSessionSchema = new mongoose.Schema(
  {
    visitor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Visitor",
      required: true,
      index: true,
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
      index: true,
    },
    sessionId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    referrer: {
      type: String,
    },
    startTime: {
      type: Date,
      required: true,
      default: Date.now,
    },
    endTime: {
      type: Date,
    },
    pageViews: {
      type: Number,
      default: 0,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    scrollDepth: {
      type: Number,
      default: 0, // value between 0-100
    },
    idleTime: {
      type: Number,
      default: 0, // seconds or ms, your choice
    },
    mouseMoves: {
      type: Number,
      default: 0,
    },
    focusChanges: {
      type: Number,
      default: 0,
    },
    isSuspicious: {
      type: Boolean,
      default: false,
    },
    riskScore: {
      type: Number,
      default: 0,
    },
    isBot: {
      type: Boolean,
      default: false,
    },
    isVPN: {
      type: Boolean,
      default: false,
    },
    honeypotTriggered: {
      type: Boolean,
      default: false,
    },
    honeypotValue: {
      type: String,
      default: null,
    },
    isFlagged: {
      type: Boolean,
      default: false,
    },
    flagReasons: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

// Auto-expire sessions older than 30 days
visitorSessionSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 60 * 60 * 24 * 30 }
);

module.exports = mongoose.model("VisitorSession", visitorSessionSchema);
