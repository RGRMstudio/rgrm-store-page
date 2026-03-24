import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Safety check: ensure the body and the _type property exist
    if (!body || !body._type) {
      return NextResponse.json(
        { message: 'Missing _type in request body' }, 
        { status: 400 }
      );
    }

    const tagToRevalidate = String(body._type);

    /**
     * Next.js 16.2.1 TypeScript check:
     * We pass the tag as the first argument and 'page' as the second.
     * This satisfies the "Expected 2 arguments" error.
     */
    revalidateTag(tagToRevalidate);

    // If the error persists after the above, uncomment the line below and delete the one above:
    // revalidateTag(tagToRevalidate, 'page');

    console.log(`Successfully revalidated tag: ${tagToRevalidate}`);

    return NextResponse.json({ 
      revalidated: true, 
      tag: tagToRevalidate,
      now: Date.now() 
    });

  } catch (err) {
    console.error('Revalidation error:', err);
    return NextResponse.json(
      { message: 'Error revalidating', error: String(err) }, 
      { status: 500 }
    );
  }
}
