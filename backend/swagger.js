const swaggerJsdoc = require("swagger-jsdoc");

const options = {

  definition: {
    openapi: "3.0.0",
    info: {
      title: "IP Blocking API",
      version: "1.0.0",
      description: "API for managing IP and country-based access control",
      contact: {
        name: "API Support",
        email: "support@example.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // Firebase ID token is still a JWT
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "The unique identifier for the user",
              example: "60b8d8b8f4d76d0f1c8e4d4b",
            },
            email: {
              type: "string",
              description: "The email address of the user",
              example: "user@example.com",
            },
            name: {
              type: "string",
              description: "The name of the user",
              example: "John Doe",
            },
            isEmailVerified: {
              type: "boolean",
              description: "Indicates whether the user's email is verified",
              example: true,
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "The date and time when the user was created",
              example: "2021-06-01T12:00:00Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "The date and time when the user was last updated",
              example: "2021-06-01T12:00:00Z",
            },
          },
        },
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

        BlockedCountry: {
          type: "object",
          properties: {
            countryCode: {
              type: "string",
              description: "ISO 3166-1 alpha-2 country code",
              example: "US",
            },
            reason: {
              type: "string",
              description: "Reason for blocking the country",
              example: "Security concerns",
            },
            isActive: {
              type: "boolean",
              description: "Whether the block is active",
              example: true,
            },
            blockedBy: {
              type: "string",
              description: 'ID of user who blocked the country or "system"',
              example: "system",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            error: {
              type: "string",
              description: "Error message",
              example: "Internal server error",
            },
          },
        },

        GARequest: {
          type: "object",
          properties: {
            token: {
              type: "string",
              description: "Google Analytics access token",
              example: "your_access_token",
            },
            propertyId: {
              type: "string",
              description: "Google Analytics property ID",
              example: "123456",
            },
            email: {
              type: "string",
              description: "User email",
              example: "user@example.com",
            },
          },
        },
        DomainResponse: {
          type: "object",
          properties: {
            domains: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  displayName: {
                    type: "string",
                    description: "Display name of the domain",
                    example: "example.com",
                  },
                  defaultUri: {
                    type: "string",
                    description: "Default URI of the domain",
                    example: "https://example.com",
                  },
                },
              },
            },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./routes/*.js", "./controllers/*.js", "./docs/components/*.yaml"], // adjust if your route files are elsewhere
};


module.exports = swaggerJsdoc(options);
