import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
    const token = process.env.SANITY_API_TOKEN || process.env.SANITY_API_WRITE_TOKEN;

    if (!projectId) {
      return NextResponse.json({ error: 'Missing NEXT_PUBLIC_SANITY_PROJECT_ID' }, { status: 500 });
    }

    const { createClient } = await import('@sanity/client');
    const client = createClient({
      projectId,
      dataset,
      token,
      useCdn: false,
      apiVersion: '2026-03-25',
    });

    return NextResponse.json({ ok: true, message: 'Sync route ready' });
  } catch (err: any) {
    console.error('Sync error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
