module.exports = {
  apps: [
    {
      name: "miniripple-backend",
      script: "./app.js",
      cwd: "/var/www/miniripple-backend",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};

