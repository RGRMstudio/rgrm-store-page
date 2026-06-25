// Example frontend code (pseudo-code for illustration)
async function handleCheckoutButtonClick(productId, variantId) {
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        variantId: variantId, // The crucial Printful variant ID
        quantity: 1, // or get from quantity selector
        successUrl: 'https://www.raguiromo.store/success?session_id={CHECKOUT_SESSION_ID}',
        cancelUrl: 'https://www.raguiromo.store/cancel',
      }),
    });

    if (response.ok) {
      const { id: sessionId } = await response.json();
      // Redirect to Stripe Checkout using the returned session ID
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
      await stripe.redirectToCheckout({ sessionId });
    } else {
      console.error('Failed to create checkout session');
      // Handle error (show message to user)
    }
  } catch (error) {
    console.error('Error:', error);
    // Handle error
  }
}
