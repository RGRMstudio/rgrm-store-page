import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const sanity = createClient({
  projectId: process.env.SANITY_API_PROJECT_ID!,
  dataset: process.env.SANITY_API_DATASET!,
  token: process.env.SANITY_API_WRITE_TOKEN!,
  apiVersion: "2024-01-01",
  useCdn: false,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, data } = body;

    console.log("Printful webhook received:", type);

    switch (type) {
      // ── Order events ──────────────────────────────────────────
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

      // ── Shipment events ───────────────────────────────────────
      case "shipment_sent":
        console.log("Order shipped:", data.shipment?.id);
        // You can notify customer via Loops here
        break;

      // ── Product events ────────────────────────────────────────
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

        console.log("Product synced to Sanity:", product.name);
        break;
      }

      case "product_deleted": {
        const deletedProduct = data.sync_product;
        if (!deletedProduct) break;

        await sanity
          .patch(`printful-${deletedProduct.id}`)
          .set({ isActive: false })
          .commit();

        console.log("Product deactivated in Sanity:", deletedProduct.id);
        break;
      }

      // ── Stock events ──────────────────────────────────────────
      case "stock_updated": {
        const stockProduct = data.sync_product;
        if (!stockProduct) break;

        console.log("Stock updated for product:", stockProduct.id);
        // Trigger a full re-sync for this product
        const res = await fetch(
          `https://api.printful.com/store/products/${stockProduct.id}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
            },
          }
        );
        const productData = await res.json();
        const { sync_product, sync_variants } = productData.result;

        const variants = sync_variants.map((v: any) => ({
          _type: "variant",
          _key: String(v.id),
          variantId: String(v.id),
          name: v.name,
          sku: v.sku,
          price: parseFloat(v.retail_price),
          currency: v.currency,
          size: v.size || null,
          color: v.color || null,
          inStock: v.availability_status === "active",
          updatedAt: new Date().toISOString(),
        }));

        await sanity
          .patch(`printful-${sync_product.id}`)
          .set({ variants, updatedAt: new Date().toISOString() })
          .commit();

        console.log("Stock updated in Sanity for:", sync_product.name);
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
