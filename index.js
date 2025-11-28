import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

const SHEET_NAME = "Orders";   // 🔻 추가!!!  (시트 이름과 정확히 일치해야 함)
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
