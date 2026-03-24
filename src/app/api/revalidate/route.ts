import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

/**
 * RGRM // CACHE_INVALIDATION_PROTOCOL
 * Purpose: Sync Sanity CMS with Next.js Frontend in real-time.
 */

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{ _type: string }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    );

    if (!isValidSignature) {
      return new NextResponse('Invalid Signature', { status: 401 });
    }

    if (!body?._type) {
      return new NextResponse('Bad Request', { status: 400 });
    }

    // This clears the cache for anything tagged with 'study'
    revalidateTag(body._type);
    console.log(revalidateTag(body._type, 'page');

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err: any) {
    console.error(err);
    return new NextResponse(err.message, { status: 500 });
  }
}
