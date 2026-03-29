import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const tag = body._type; // Revalidates based on the Sanity schema type (product/settings)

    if (tag) {
      // This tells Next.js to dump the old cache and fetch the new RGRM data
      revalidateTag(tag);
      return NextResponse.json({ revalidated: true, now: Date.now() });
    }

    return NextResponse.json({ revalidated: false, message: 'Missing tag' });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating', err }, { status: 500 });
  }
}
