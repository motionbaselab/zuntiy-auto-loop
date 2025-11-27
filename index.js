const express = require("express");
const crypto = require("crypto");
const bodyParser = require("body-parser");
const shopifyRoutes = require("./routes/shopify.js");

const app = express();
app.use(bodyParser.json());

// 기본 API 체크
app.get("/", (req, res) => {
  res.send("ZUNITY AUTO-LOOP Server Running OK!");
});

// Test route
app.get("/test", (req, res) => {
  res.send("TEST OK");
});

// Shopify Webhook 엔드포인트
app.use("/api/shopify", shopifyRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
