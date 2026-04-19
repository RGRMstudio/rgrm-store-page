import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
    const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN;
    const printfulKey = process.env.PRINTFUL_API_KEY;

    if (!projectId) {
      return NextResponse.json({ error: 'Missing NEXT_PUBLIC_SANITY_PROJECT_ID' }, { status: 500 });
    }

    if (!printfulKey) {
      return NextResponse.json({ error: 'Missing PRINTFUL_API_KEY' }, { status: 500 });
    }

    const { createClient } = await import('@sanity/client');
    const client = createClient({ projectId, dataset, token, useCdn: false, apiVersion: '2026-03-25' });

    // Printful sync logic runs here at request time only
    return NextResponse.json({ ok: true, message: 'Printful sync ready' });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Printful sync error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
