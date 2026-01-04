// src/pages/api/webhook.js

export const config = {
  api: {
    bodyParser: true, // This replaces 'micro' and 'express.json()'
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const data = req.body; // Body is automatically parsed by Next.js
    
    // Your logic here (e.g., sending data to Loops)
    console.log("Webhook received:", data);

    return res.status(200).json({ received: true });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
