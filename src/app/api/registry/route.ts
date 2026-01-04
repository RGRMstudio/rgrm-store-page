import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Sends the contact to Loops.so for automated newsletter management
    const response = await fetch('https://app.loops.so/api/v1/contacts/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.LOOPS_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email, 
        source: 'RaGuiRoMo Registry',
        userGroup: 'Potential Collector' 
      }),
    });

    if (!response.ok) throw new Error('Loops API error');

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to join registry' }, { status: 500 });
  }
}
