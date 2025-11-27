import express from "express";

const router = express.Router();

// Shopify 웹훅 수신 엔드포인트
router.post("/webhook", (req, res) => {
    console.log("Shopify Webhook Received:", req.body);
    res.status(200).send("Webhook OK");
});

export default router;
