import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
    const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN;

    if (!projectId) {
      return NextResponse.json({ error: 'Missing projectId' }, { status: 500 });
    }

    const { createClient } = await import('@sanity/client');
    const client = createClient({ projectId, dataset, token, useCdn: false, apiVersion: '2026-03-25' });

    const body = await req.json().catch(() => ({}));
    console.log('Printful webhook received:', body?.type);

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Printful webhook error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
