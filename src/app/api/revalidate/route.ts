import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const tag = body?._type;

    if (tag) {
      // Corrected: Adding 'page' as the 2nd argument satisfies TypeScript
      revalidateTag(String(tag), 'page');
      
      console.log(`RGRM REVALIDATE SUCCESS: ${tag}`);
      return NextResponse.json({ 
        revalidated: true, 
        tag: tag 
      });
    }

    return NextResponse.json({ message: 'No tag provided' }, { status: 400 });

  } catch (err: any) {
    console.error('Revalidation Error:', err.message);
    return NextResponse.json({ message: 'Error', error: err.message }, { status: 500 });
  }
}
