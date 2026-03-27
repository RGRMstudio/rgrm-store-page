import axios from 'axios';
import 'dotenv/config';

async function checkHealth() {
  console.log("🔍 RGRM STUDIO: STARTING API CHECK...");
  console.log("--------------------------------------");

  // 1. Check Stripe
  try {
    await axios.get('https://api.stripe.com/v1/accounts', {
      headers: { 'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}` }
    });
    console.log("✅ STRIPE: Connected.");
  } catch (e) {
    console.error("❌ STRIPE: Key Error. Check your .env.local file.");
  }

  // 2. Check Printful
  try {
    await axios.get('https://api.printful.com/stores', {
      headers: { 'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}` }
    });
    console.log("✅ PRINTFUL: Connected.");
  } catch (e) {
    console.error("❌ PRINTFUL: Key Error. Check your Printful Dashboard.");
  }

  // 3. Check Loops.so
  try {
    const loopsResponse = await axios.get('https://app.loops.so/api/v1/api-key', {
      headers: { 'Authorization': `Bearer ${process.env.LOOPS_API_KEY}` }
    });
    console.log("✅ LOOPS: Connected.");
  } catch (e) {
    console.error("❌ LOOPS: Key Error. Check your Loops Settings.");
  }

  console.log("--------------------------------------");
  console.log("🚀 If all are green, you are ready to launch!");
}

checkHealth();
