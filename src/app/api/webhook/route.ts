import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // 1. Extract the data sent by your storefront or Stripe
    const { email, firstName, certificateUrl, orderNumber } = data;

    // 2. Fire the Transactional Email via Loops
    const response = await fetch('https://app.loops.so/api/v1/transactional', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.LOOPS_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        transactionalId: "PASTE_YOUR_TRANSACTIONAL_ID_HERE", // Found on the 'Publish' page in Loops
        email: email,
        dataVariables: {
          firstName: firstName,          // Matches {DATA_VARIABLE:firstName} in your template
          certificateLink: certificateUrl, // Matches {DATA_VARIABLE:certificateLink} 
          orderNumber: orderNumber       // Matches {DATA_VARIABLE:orderNumber}
        },
      }),
    });

    const result = await response.json();

    if (result.success) {
      return NextResponse.json({ message: 'Certificate email sent!' }, { status: 200 });
    } else {
      console.error('Loops Error:', result.message);
      return NextResponse.json({ error: result.message }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
