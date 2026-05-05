import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    // Revalidate the selection page
    revalidatePath('/selection');
    
    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(),
      message: 'Selection page revalidated successfully'
    });
  } catch (error) {
    return NextResponse.json({ 
      revalidated: false, 
      error: 'Error revalidating' 
    }, { status: 500 });
  }
}
