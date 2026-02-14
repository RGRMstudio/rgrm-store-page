import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const response = await fetch('https://app.loops.so/api/v1/contacts/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.LOOPS_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        userGroup: 'Phase 01 Registry', // Categorizes them in your Loops dashboard
        source: 'RGRM Storefront'
      }),
    });

    if (!response.ok) {
      throw new Error('Loops API failure');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('REGISTRY_ERROR:', error);
    return NextResponse.json({ error: 'Registry failed' }, { status: 500 });
  }
}
