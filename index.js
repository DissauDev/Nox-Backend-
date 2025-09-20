// index.js
require('dotenv').config();
const { buildApp } = require('./app');

const app = buildApp();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
