import express from "express";
import verifyShopify from "../utils/verifyShopify.js";
import { sendToPrintful } from "../utils/printful.js";

const router = express.Router();

// Shopify → 주문 생성
router.post("/webhook", verifyShopify, async (req, res) => {
  try {
    const event = req.headers["x-shopify-topic"];
    const data = req.body;

    console.log("📦 Webhook received:", event);

    if (event === "orders/create") {
      await sendToPrintful(data);
      console.log("🟢 주문 자동 전송 완료");
    }

    res.status(200).send("OK");
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).send("Server error");
  }
});

export default router;
