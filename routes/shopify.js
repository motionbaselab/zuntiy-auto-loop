import express from "express";
import { google } from "googleapis";

const router = express.Router();

// --- Google Sheets 설정 ---
const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const SHEET_NAME = "Orders";   // 시트 이름

// --- Shopify Webhook 엔드포인트 ---
router.post("/webhook", async (req, res) => {
  try {
    const data = req.body;
    console.log("🔥 Shopify Webhook Received:", data);

    // 주문 데이터 추출
    const row = [
      data.id || "",                                // order_id
      data.customer?.first_name + " " + data.customer?.last_name || "",
      data.email || "",
      data.total_price || "",
      data.currency || "",
      data.line_items?.[0]?.title || "",
      data.line_items?.[0]?.quantity || "",
      data.shipping_address?.name || "",
      data.shipping_address?.address1 || "",
      data.shipping_address?.address2 || "",
      data.shipping_address?.city || "",
      data.created_at || "",
    ];

    // Google Sheets에 추가
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:Z`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [row] },
    });

    console.log("✅ Google Sheets 저장 완료");
    res.status(200).send("Webhook OK");
  } catch (error) {
    console.error("❌ Webhook 처리 오류:", error);
    res.status(500).send("Error processing webhook");
  }
});

export default router;
