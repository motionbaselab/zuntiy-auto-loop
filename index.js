import express from "express";
import bodyParser from "body-parser";
import shopifyRoutes from "./routes/shopify.js";

const app = express();
app.use(bodyParser.json());

// 기본 홈
app.get("/", (req, res) => {
    res.send("ZUNITY AUTO-LOOP Server Running OK!");
});

// Shopify 엔드포인트
app.use("/api/shopify", shopifyRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
