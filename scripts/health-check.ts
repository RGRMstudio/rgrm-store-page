import Stripe from 'stripe';
import * as dotenv from 'dotenv'; // Add this import

// This line is the "Power Switch"
dotenv.config({ path: '.env.local' }); 

async function verifyStudioIntegrity() {
  console.log('--- RGRM STUDIO: SYSTEM INTEGRITY CHECK ---');
  // ... rest of the code remains the same
