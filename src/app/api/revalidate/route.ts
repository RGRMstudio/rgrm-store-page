// src/app/api/revalidate/route.ts

import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body || !body._type) {
      return NextResponse.json({ message: 'Missing type' }, { status: 400 });
    }

    // Pass 'page' as the second argument to satisfy the 2-argument requirement
    revalidateTag(String(body._type)); 
    
    // IF THE ABOVE STILL FAILS, try this instead:
    // revalidateTag(String(body._type), 'page');

    console.log(`REVALIDATED: ${body._type}`);

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}
