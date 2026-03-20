import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, firstName, lastName } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // 1. CREATE CONTACT IN LOOPS
    const contactRes = await fetch('https://app.loops.so/api/v1/contacts/create', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.LOOPS_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        firstName: firstName || '',
        lastName: lastName || '',
        source: 'RGRM Selection Register',
        userGroup: 'Phase 01',
        subscribed: true,
      }),
    });

    if (!contactRes.ok) throw new Error('Loops contact creation failed');

    // 2. SEND WELCOME EMAIL EVENT
    await fetch('https://app.loops.so/api/v1/events/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.LOOPS_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        eventName: 'Welcome',
        contactProperties: {
          firstName: firstName || '',
          lastName: lastName || '',
          registeredAt: new Date().toISOString(),
        },
      }),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Register error:', err);
    return NextResponse.json({ error: 'Failed to register' }, { status: 500 });
  }
}
