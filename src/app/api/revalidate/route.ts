import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Basic validation to ensure we have the data we need
    if (!body || !body._type) {
      return NextResponse.json(
        { message: 'Missing _type in request body' }, 
        { status: 400 }
      );
    }

    const tagToRevalidate = String(body._type);

    /**
     * 2. REVALIDATION LOGIC
     * We pass two arguments to satisfy the TypeScript "Expected 2 arguments" error.
     * The first is the tag name, the second is the type ('page').
     */
    revalidateTag(tagToRevalidate, 'page');

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
