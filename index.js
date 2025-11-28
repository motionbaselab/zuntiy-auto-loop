import { google } from "googleapis";
import express from "express";
import bodyParser from "body-parser";

// -------------------- Google Auth --------------------
const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

// Google Sheets 연결
const sheets = google.sheets({ version: "v4", auth });

// 환경변수
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const SHEET_NAME = "orders";   // 시트 탭 이름

// -------------------- Express --------------------
import shopifyRoutes from "./routes/shopify.js";
const app = express();
app.use(bodyParser.json());

// 기본 홈
app.get("/", (req, res) => {
  res.send("ZUNITY AUTO-LOOP Server Running OK!");
});

// Shopify 엔드포인트
app.use("/api/shopify", shopifyRoutes);

// 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
