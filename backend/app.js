const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();

// Connect to MongoDB
const connectDB = require("./config/mongodb");
connectDB();

// Routes
const authRoutes = require("./routes/auth");
//const ipMonitorRoutes = require("./routes/ipMonitor");
const deviceBlockRoutes = require("./routes/deviceBlock.routes");
const analyticsRoutes = require("./routes/analytics");
const propertyRoutes = require("./routes/property.routes");
const VisitorLogRoutes = require("./routes/visitorLog.routes");
const BlockedIPRoutes = require("./routes/blockedIP.routes");
const blockedCountryRoutes = require("./routes/blockedCountry.routes");
//const countryBlockRoutes = require("./routes/countryBlock");

// Middlewares
const countryBlocker = require("./middleware/countryBlocker");
//const deviceDetection = require("./middleware/deviceDetection");

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

// Apply device detection middleware
//app.use(deviceDetection);

// Apply country blocking middleware
//app.use(countryBlocker);

// Routes
app.use("/api/v2/visitor", VisitorLogRoutes);
app.use("/api/v2/property", propertyRoutes);
app.use("/api/v1/users/", authRoutes);
app.use("/api/v2/blocked-ip", BlockedIPRoutes);
app.use("/api/v2/blocked-country", blockedCountryRoutes);
app.use("/api/v2/device-block", deviceBlockRoutes);
//app.use("/api/admin/country-blocks", countryBlockRoutes);
app.use("/api/v1/analytics", analyticsRoutes);

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
