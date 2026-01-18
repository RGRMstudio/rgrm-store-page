import axios from 'axios';

const URL = 'https://raguiromo.store';
const INTERVAL = 5 * 60 * 1000; // 5 minutes
const DURATION = 60 * 60 * 1000; // 1 hour

console.log('--- 🛡️ RGRMstore Post-Merge Health Guard ---');

const checkSite = async () => {
  const start = Date.now();
  try {
    const res = await axios.get(URL);
    const latency = Date.now() - start;
    console.log(`[${new Date().toLocaleTimeString()}] ✅ Online | Latency: ${latency}ms | Status: ${res.status}`);
  } catch (e: any) {
    console.log(`[${new Date().toLocaleTimeString()}] ❌ ALERT: Site unreachable! `, e.message);
  }
};

checkSite();
const monitor = setInterval(checkSite, INTERVAL);
setTimeout(() => {
  clearInterval(monitor);
  console.log('--- ✅ Monitoring Complete ---');
}, DURATION);
