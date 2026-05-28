import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    console.log('🔔 Printful Webhook Received:', data.type);
    
    // Handle different event types
    switch (data.type) {
      case 'package_shipped':
        await handleShipped(data.data);
        break;
      case 'order_failed':
        await handleFailed(data.data);
        break;
      case 'order_updated':
        await handleUpdated(data.data);
        break;
      default:
        console.log('Unhandled webhook type:', data.type);
    }
    
    return NextResponse.json({ success: true }, { status: 200 });
    
  } catch (error) {
    console.error('❌ Webhook error:', error);
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 });
  }
}

async function handleShipped(data: any) {
  const { order, shipment } = data;
  console.log(`📦 Order ${order.id} shipped! Tracking: ${shipment.tracking_number}`);
  // TODO: Send email to customer with tracking
}

async function handleFailed(data: any) {
  const { order, reason } = data;
  console.error(`❌ Order ${order.id} failed: ${reason}`);
  // TODO: Alert you via Discord/email
}

async function handleUpdated(data: any) {
  const { order } = data;
  console.log(`🔄 Order ${order.id} updated to status: ${order.status}`);
}
