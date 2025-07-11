export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  // Forward request to your actual n8n webhook
  const response = await fetch("https://n8n-v1-11k3.onrender.com/webhook/151db651-b573-48f9-8384-6aaad863705c", {
    method: req.method,
    headers: {
      "Content-Type": req.headers["content-type"] || "application/json",
    },
    body: req.method === "POST" ? req.body : undefined,
  });

  const data = await response.text();
  res.status(response.status).send(data);
}
