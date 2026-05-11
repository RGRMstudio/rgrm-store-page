// src/app/api/create-checkout-session/route.ts

// ... existing imports (e.g., stripe, NextRequest, NextResponse)

export async function POST(req: NextRequest) {
  try {
    const { name, size, price, image } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: { // FIXED: Changed 'price_ {' to 'price_data: {'
            currency: 'usd',
            product_data: { // FIXED: Changed 'product_ {' to 'product_data: {'
              name: `${name}${size ? ` - Size: ${size}` : ''}`,
              images: [image],
            },
            unit_amount: Math.round(price * 100), // Stripe expects amounts in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/selection`,
    });

    return NextResponse.json({ id: session.id });
  } catch (err: any) {
    console.error("Stripe Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
