require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT || 3002, () => {
  console.log(`CDN server running on port ${process.env.PORT || 3002}`);
});
