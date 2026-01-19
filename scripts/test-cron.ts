import axios from 'axios';

async function testCron() {
  console.log('--- 🧪 Testing Inventory Sync Cron ---');
  
  // Use local environment variables
  const CRON_SECRET = process.env.CRON_SECRET || 'your_local_test_secret';
  const LOCAL_URL = 'http://localhost:3000/api/cron/sync-inventory';

  try {
    const res = await axios.get(LOCAL_URL, {
      headers: {
        'Authorization': `Bearer ${CRON_SECRET}`
      }
    });
    console.log('✅ Local Test Success:', res.data);
  } catch (error: any) {
    console.error('❌ Local Test Failed:', error.response?.data || error.message);
  }
}

testCron();
