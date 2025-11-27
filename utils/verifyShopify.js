import crypto from "crypto";

export default function verifyShopify(req, res, next) {
  try {
    const secret = process.env.SHOPIFY_WEBHOOK_SECRET;
    const hmac = req.headers["x-shopify-hmac-sha256"];
    const body = JSON.stringify(req.body);

    const hash = crypto
      .createHmac("sha256", secret)
      .update(body, "utf8")
      .digest("base64");

    if (hash !== hmac) {
      return res.status(401).send("Unauthorized");
    }

    next();
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
}
