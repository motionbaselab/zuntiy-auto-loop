import express from "express";
const router = express.Router();

// 기본 체크용
router.get("/", (req, res) => {
  res.send("SHOPIFY ROUTER OK");
});

export default router;
