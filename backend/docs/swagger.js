const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "IP Blocking & Visitor Tracking API",
      version: "1.0.0",
      description:
        "API for managing blocked IPs, properties, and visitor logs.",
    },
    components: {
      schemas: {
        BlockedIP: {
          type: "object",
          required: ["ip", "property", "propertyId", "reason", "blockedBy"],
          properties: {
            ip: { type: "string", example: "192.168.0.1" },
            property: {
              type: "string",
              format: "uuid",
              example: "662757aa2d90f2b2c2b5e3e1",
            },
            propertyId: { type: "string", example: "MR-1234" },
            reason: { type: "string", example: "Suspicious behavior detected" },
            blockedAt: { type: "string", format: "date-time" },
            blockedBy: {
              type: "string",
              format: "uuid",
              example: "662757aa2d90f2b2c2b5e3d2",
            },
            expiresAt: { type: "string", format: "date-time", nullable: true },
            isActive: { type: "boolean", default: true },
          },
        },
        Property: {
          type: "object",
          required: ["propertyId", "domain", "user"],
          properties: {
            propertyId: { type: "string", example: "MR-1234" },
            domain: { type: "string", example: "example.com" },
            user: {
              type: "string",
              format: "uuid",
              example: "662757aa2d90f2b2c2b5e3d2",
            },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        VisitorLog: {
          type: "object",
          required: ["visitorId", "property", "propertyId", "ip"],
          properties: {
            visitorId: { type: "string", example: "visitor_abc123" },
            property: { type: "string", format: "uuid" },
            propertyId: { type: "string", example: "MR-1234" },
            ip: { type: "string", example: "192.168.0.1" },
            country: { type: "string", example: "US" },
            userAgent: { type: "string" },
            browser: { type: "string" },
            os: { type: "string" },
            device: { type: "string" },
            screen: { type: "string" },
            language: { type: "string" },
            timezone: { type: "string" },
            referrer: { type: "string" },
            isBot: { type: "boolean", default: false },
            isVPN: { type: "boolean", default: false },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
  },
  apis: ["./docs/components/*.yaml"], // adjust if your route files are elsewhere
};
const swaggerDocs = swaggerJsDoc(options);
module.exports = swaggerDocs;
