import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  // Simple security check for Cron jobs
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const response = await fetch(`https://api.printful.com/store/products`, {
      headers: { 'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}` },
    });
    const data = await response.json();
    
    // Logic to update your DB would go here
    return NextResponse.json({ synced: true, count: data.result.length });
  } catch (error) {
    return NextResponse.json({ error: 'Sync Failed' }, { status: 500 });
  }
}
