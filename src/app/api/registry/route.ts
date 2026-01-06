import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, firstName } = await req.json();

  const response = await fetch('https://app.loops.so/api/v1/contacts/create', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.LOOPS_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, firstName, source: 'Boutique Registry' }),
  });

  if (response.ok) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: 'Failed to join registry' }, { status: 500 });
}
