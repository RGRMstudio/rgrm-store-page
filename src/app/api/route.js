import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Next.js App Router parses JSON automatically with req.json()
    const data = await req.json();
    
    console.log("Webhook data received:", data);

    // Add your Loops.so or Stripe logic here
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to parse request' }, { status: 400 });
  }
}
