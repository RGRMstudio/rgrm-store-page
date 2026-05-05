import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    // Tell Next.js to refresh the /selection page cache
    revalidatePath('/selection');
    
    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(),
      message: 'Selection page refreshed!'
    });
  } catch (error) {
    return NextResponse.json({ 
      revalidated: false, 
      error: 'Error revalidating' 
    }, { status: 500 });
  }
}
