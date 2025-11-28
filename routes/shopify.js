import express from "express";
import { google } from "googleapis";

const router = express.Router();

// Google Sheets 설정
const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const SHEET_NAME = "Orders"; // 시트 이름과 반드시 일치해야 함

// Shopify Webhook 수신 엔드포인트
router.post("/webhook", async (req, res) => {
  const data = req.body;
  console.log("🟢 Shopify Webhook Received:", data);

  const row = [
    data.id || "",
    `${data.customer?.first_name || ""} ${data.customer?.last_name || ""}`,
    data.email || "",
    data.total_price || "",
    data.currency || "",
    data.line_items?.[0]?.title || "",
    data.line_items?.[0]?.quantity || "",
    data.shipping_address?.first_name || "",
    data.shipping_address?.address1 || "",
    data.shipping_address?.address2 || "",
    data.shipping_address?.city || "",
    new Date().toISOString(),
  ];

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A1`,
      valueInputOption: "RAW",
      requestBody: { values: [row] },
    });

    console.log("✅ Google Sheets 기록 성공");
    res.status(200).send("Webhook OK");
  } catch (error) {
    console.error("❌ Google Sheets 기록 실패:", error);
    res.status(500).send("Error");
  }
});

export default router;
``
