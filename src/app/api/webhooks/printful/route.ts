import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const sanity = createClient({
  projectId: process.env.SANITY_API_PROJECT_ID!,
  dataset: process.env.SANITY_API_DATASET!,
  token: process.env.SANITY_API_WRITE_TOKEN!,
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function sendLoopsEvent(email: string, eventName: string, eventProperties: Record<string, any> = {}, contactProperties: Record<string, any> = {}) {
  try {
    const res = await fetch('https://app.loops.so/api/v1/events/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.LOOPS_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, eventName, eventProperties, contactProperties }),
    });
    if (!res.ok) {
      const error = await res.json();
      console.error(`Loops event "${eventName}" failed:`, error);
    } else {
      console.log(`✅ Loops event "${eventName}" sent to ${email}`);
    }
  } catch (err) {
    console.error(`Loops fetch error for "${eventName}":`, err);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, data } = body;

    console.log("Printful webhook received:", type);

    switch (type) {

      // ── Order Events ──────────────────────────────────────────────────────
      case "order_created":
        console.log("New order created:", data.order?.id);
        break;

      case "order_updated":
        console.log("Order updated:", data.order?.id);
        break;

      case "order_failed":
        console.error("Order failed:", data.order?.id);
        break;

      case "order_canceled":
        console.log("Order canceled:", data.order?.id);
        break;

      case "order_put_hold":
        console.warn("Order put on hold:", data.order?.id);
        break;

      case "order_remove_hold":
        console.log("Order hold removed:", data.order?.id);
        break;

      // ── Shipment Events ───────────────────────────────────────────────────
      case "package_shipped": {
        const order = data.order;
        const shipment = data.shipment;
        const customerEmail = order?.recipient?.email;

        console.log("Package shipped:", shipment?.id);

        if (customerEmail) {
          await sendLoopsEvent(
            customerEmail,
            'Package Shipped',
            {
              trackingNumber: shipment?.tracking_number || '',
              trackingUrl: shipment?.tracking_url || '',
              carrier: shipment?.carrier || '',
              estimatedDelivery: shipment?.estimated_delivery_date || '',
              orderId: order?.id,
            },
            {
              lastShipmentDate: new Date().toISOString(),
            }
          );
        }
        break;
      }

      case "package_returned":
        console.warn("Package returned:", data.shipment?.id);
        break;

      // ── Product Events ────────────────────────────────────────────────────
      case "product_synced":
      case "product_updated": {
        const product = data.sync_product;
        if (!product) break;

        await sanity
          .patch(`printful-${product.id}`)
          .set({
            name: product.name,
            thumbnail: product.thumbnail_url,
            isActive: true,
            updatedAt: new Date().toISOString(),
          })
          .commit();

        console.log("✅ Product synced to Sanity:", product.name);
        break;
      }

      case "product_deleted": {
        const deletedProduct = data.sync_product;
        if (!deletedProduct) break;

        await sanity
          .patch(`printful-${deletedProduct.id}`)
          .set({ isActive: false })
          .commit();

        console.log("✅ Product deactivated in Sanity:", deletedProduct.id);
        break;
      }

      default:
        console.log("Unhandled Printful event:", type);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Printful webhook error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
