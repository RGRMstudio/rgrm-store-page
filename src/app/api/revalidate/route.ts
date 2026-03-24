// src/app/api/revalidate/route.ts

import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body._type) {
      return NextResponse.json({ message: 'Missing type' }, { status: 400 });
    }

    // Ensure the tag is explicitly passed as a string
    // In some TS versions, adding a second argument like 'page' or 'layout' 
    // is required if you are using revalidatePath, but for revalidateTag 
    // it usually just needs the tag.
    
    revalidateTag(String(body._type));
    
    console.log(`REVALIDATED: ${body._type}`);

    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now() 
    });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}
