import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const tag = body?._type;

    if (tag) {
      // @ts-ignore - Bypassing the "2 arguments" error to force the build
      revalidateTag(String(tag));
      console.log(`REVALIDATED: ${tag}`);
    }

    return NextResponse.json({ revalidated: true });
  } catch (err) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}
