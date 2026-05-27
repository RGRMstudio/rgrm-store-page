import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const API_KEY = process.env.PRINTFUL_API_KEY;
    const STORE_ID = process.env.PRINTFUL_STORE_ID;
    const WEBHOOK_URL = 'https://www.raguiromo.store/api/webhooks/printful';

    if (!API_KEY || !STORE_ID) {
      return NextResponse.json(
        { error: 'Missing PRINTFUL_API_KEY or PRINTFUL_STORE_ID' },
        { status: 400 }
      );
    }

    // First, check if webhook already exists
    const checkResponse = await fetch('https://api.printful.com/webhooks', {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'X-PF-Store-Id': STORE_ID,
      },
    });

    const checkData = await checkResponse.json();

    // If webhook exists and matches our URL, we're done
    if (checkData.result?.url === WEBHOOK_URL) {
      return NextResponse.json({ 
        message: 'Webhook already configured', 
        webhook: checkData.result 
      });
    }

    // Create new webhook
    const response = await fetch('https://api.printful.com/webhooks', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'X-PF-Store-Id': STORE_ID,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: WEBHOOK_URL,
        types: [
          'package_shipped',    // When order ships
          'order_failed',       // If order fails
          'order_updated',      // When status changes
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to create webhook');
    }

    return NextResponse.json({
      message: 'Webhook created successfully!',
      webhook: data.result,
    });

  } catch (error: any) {
    console.error('❌ Webhook setup error:', error);
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}
