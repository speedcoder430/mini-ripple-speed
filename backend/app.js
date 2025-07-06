const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const app = express();
const { handleStripeWebhook  } = require("./controllers/payment.controller");
// Connect to MongoDB
const connectDB = require("./config/mongodb");
connectDB();

// Routes
app.post(
  "/api/v1/payment/webhook",
  express.raw({ type: "application/json" }),
  handleStripeWebhook
);

app.use(express.json());
app.use(express.urlencoded({extended:true}))

const ipBlockingCron = require('./cron/ipBlocking.cron');
ipBlockingCron.init();


const authRoutes = require("./routes/auth");
const blockedDeviceRoutes = require("./routes/blockedDevice.routes");
const browserBlockRoutes = require("./routes/blockedBrowser.routes");
const analyticsRoutes = require("./routes/analytics");
const propertyRoutes = require("./routes/property.routes");
const VisitorRoutes = require("./routes/visitor.routes");
const BlockedIPRoutes = require("./routes/blockedIP.routes");
const blockedCountryRoutes = require("./routes/blockedCountry.routes");

const SubscriptionPlanRoutes = require("./routes/subscriptionPlanRoutes");
const UserSubscriptionRoutes = require("./routes/userSubscription.routes");
const PaymentRoute = require("./routes/payment.routes");
//const countryBlockRoutes = require("./routes/countryBlock");

const dashboardRoutes = require("./routes/dashboard.routes");
const trafficAnalyticsRoutes = require("./routes/trafficAnalytics.routes");
const securityThreatRoutes = require('./routes/securityThreat.routes');
const trackingRoutes = require('./routes/tracking.routes');
const domainRoutes = require('./routes/domain.routes');
const visitorIpManagementRoutes = require("./routes/visitorIpManagement.routes")
const deviceBrowserInsightsRoutes = require("./routes/deviceBrowserInsights.routes");
const blockedSuspiciousActivityLogRoutes = require('./routes/blockedSuspiciousActivityLog.routes');

// ... other v2 routes

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
    ],
  })
);
app.use(bodyParser.json());


// Routes

app.use("/api/v1/stripe", PaymentRoute);

app.use("/api/v2/visitor", VisitorRoutes);

app.use('/api/v2/properties', propertyRoutes);
app.use('/api/v2/domain', domainRoutes);
app.use("/api/v1/users/", authRoutes);
app.use("/api/v2/blocked-ip", BlockedIPRoutes);
app.use("/api/v2/blocked-country", blockedCountryRoutes);
app.use("/api/v2/device-block", blockedDeviceRoutes);
app.use("/api/v2/browser-block", browserBlockRoutes);
app.use("/api/v2/dashboard", dashboardRoutes);
app.use("/api/v2/traffic-analytics", trafficAnalyticsRoutes);
app.use('/api/v2/security-threat', securityThreatRoutes);
app.use('/api/v2/visitor-ip-management', visitorIpManagementRoutes);
app.use("/api/v2/device-browser-insights", deviceBrowserInsightsRoutes);
app.use('/api/v2/blocked-suspicious-activity', blockedSuspiciousActivityLogRoutes);

app.use("/api/v2/tracking", trackingRoutes);

app.use("/api/v1/analytics", analyticsRoutes);
app.use("/api/v1/plans", SubscriptionPlanRoutes);
app.use("/api/v1/user-subscription", UserSubscriptionRoutes);

// Swagger UI
app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Serve static files from public directory
app.use(express.static("public"));

// PORT
const port = process.env.PORT || 8000;

// Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
  console.log(
    `API Documentation available at http://localhost:${port}/api/api-docs`
  );
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

// // ✅ 1. Stripe Webhook route must be registered BEFORE express.json()
// app.post(
//   "/api/v1/payments/webhook",
//   express.raw({ type: "application/json" }),
//   handleStripeWebhook
// );

