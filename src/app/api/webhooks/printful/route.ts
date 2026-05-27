import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Get the webhook data from Printful
    const data = await request.json();
    
    // Log it for debugging (you can remove this later)
    console.log('🔔 Printful Webhook Received:', data.type);
    
    // Handle different event types
    switch (data.type) {
      case 'package_shipped':
        // Order shipped! Send tracking to customer
        await handleShipped(data.data);
        break;
        
      case 'order_failed':
        // Order failed! Alert you to fix it
        await handleFailed(data.data);
        break;
        
      case 'order_updated':
        // Order status changed
        await handleUpdated(data.data);
        break;
        
      default:
        console.log('Unhandled webhook type:', data.type);
    }
    
    // Always return 200 to tell Printful we got it
    return NextResponse.json({ success: true }, { status: 200 });
    
  } catch (error) {
    console.error('❌ Webhook error:', error);
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 });
  }
}

// Handle shipped orders
async function handleShipped(data: any) {
  const { order, shipment } = data;
  
  console.log(`📦 Order ${order.id} shipped! Tracking: ${shipment.tracking_number}`);
  
  // TODO: Send email to customer with tracking info
  // Example: await sendTrackingEmail(order.recipient.email, shipment.tracking_url);
}

// Handle failed orders
async function handleFailed(data: any) {
  const { order, reason } = data;
  
  console.error(`❌ Order ${order.id} failed: ${reason}`);
  
  // TODO: Alert you via Discord/email
  // Example: await sendAlert(`Order ${order.id} failed: ${reason}`);
}

// Handle order updates
async function handleUpdated(data: any) {
  const { order } = data;
  
  console.log(`🔄 Order ${order.id} updated to status: ${order.status}`);
  
  // TODO: Update your database if needed
}
