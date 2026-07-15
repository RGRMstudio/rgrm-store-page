import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string;
      slug?: string;
    }>(req, process.env.SANITY_REVALIDATE_SECRET);

    if (!isValidSignature) {
      const message = 'Invalid signature';
      return NextResponse.json({ message }, { status: 401 });
    }

    if (!body?._type) {
      const message = 'Bad Request: Missing _type';
      return NextResponse.json({ message }, { status: 400 });
    }

    revalidateTag(body._type);

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: 'Error revalidating', error: (err as Error).message },
      { status: 500 }
    );
  }
}
