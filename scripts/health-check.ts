import axios from 'axios';

async function check() {
  console.log('--- 🚀 RGRMstore Final Launch Check ---');
  const domains = ['https://raguiromo.store', 'https://www.raguiromo.store'];
  for (const url of domains) {
    try {
      const res = await axios.get(url);
      console.log(`✅ ${url}: Online (${res.status})`);
    } catch (e) {
      console.log(`⚠️ ${url}: Deployment still pending...`);
    }
  }
}
check();
