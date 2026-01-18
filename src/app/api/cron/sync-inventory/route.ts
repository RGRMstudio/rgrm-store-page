import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  // Verify the request is coming from Vercel Cron
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    // Logic to sync with Printful or update your identity registry
    console.log("Syncing inventory...");
    
    return NextResponse.json({ success: true, lastRun: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Sync failed" }, { status: 500 });
  }
}
