import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const tag = body?._type;

    if (tag) {
      // The 2nd argument 'page' is required in Next.js 16.2+
      import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const tag = body?._type;

    if (tag) {
      // The 2nd argument 'page' is required in Next.js 16.2+
      revalidateTag(String(tag), 'page');
      
      console.log(`RGRM REVALIDATE SUCCESS: ${tag}`);
      return NextResponse.json({ revalidated: true, tag });
    }

    return NextResponse.json({ message: 'No tag provided' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ message: 'Error', error: err.message }, { status: 500 });
  }
}
      
      console.log(`RGRM REVALIDATE SUCCESS: ${tag}`);
      return NextResponse.json({ revalidated: true, tag });
    }

    return NextResponse.json({ message: 'No tag provided' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ message: 'Error', error: err.message }, { status: 500 });
  }
}
