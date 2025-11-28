import express from "express";
import { google } from "googleapis";

const router = express.Router();

// Google 연결 (index.js에서와 동일하게 설정)
const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

// 환경변수
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const SHEET_NAME = "orders";

// 🧩 Shopify Webhook 엔드포인트
router.post("/webhook", async (req, res) => {
  try {
    const data = req.body;
    console.log("🟢 Shopify Webhook Received:", data);

    // 주문 데이터 파싱
    const row = [
      data.id || "",
      `${data.customer?.first_name || ""} ${data.customer?.last_name || ""}`.trim(),
      data.email || "",
      data.total_price || "",
      data.currency || "",
      data.line_items?.[0]?.title || "",
      data.line_items?.[0]?.quantity || "",
      data.shipping_address?.name || "",
      data.shipping_address?.address1 || "",
      data.shipping_address?.address2 || "",
      data.shipping_address?.city || "",
      data.shipping_address?.province || "",
      data.shipping_address?.zip || "",
      data.shipping_address?.country || "",
      data.created_at || "",
    ];

    // Google Sheets에 입력
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A1`,
      valueInputOption: "RAW",
      requestBody: {
        values: [row],
      },
    });

    console.log("🟢 Google Sheet 기록 성공");
    return res.status(200).send("Webhook OK");
  } catch (error) {
    console.error("🔴 Webhook 처리 오류:", error);
    return res.status(500).send("Error processing webhook");
  }
});

export default router;
