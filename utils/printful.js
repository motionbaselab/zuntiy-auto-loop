import fetch from "node-fetch";

export async function sendToPrintful(order) {
  const url = "https://api.printful.com/orders";
  const key = process.env.PRINTFUL_API_KEY;

  const payload = {
    recipient: {
      name: order.customer.first_name,
      address1: order.shipping_address.address1,
      city: order.shipping_address.city,
      country_code: order.shipping_address.country,
      zip: order.shipping_address.zip
    },
    items: order.line_items.map((item) => ({
      variant_id: item.variant_id,
      quantity: item.quantity,
    }))
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();
  console.log("🖨️ Printful Response:", result);

  return result;
}
