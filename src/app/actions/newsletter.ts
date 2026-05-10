'use server';

import { LoopsClient } from 'loops';

const loops = new LoopsClient(process.env.LOOPS_API_KEY as string);

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get('email') as string;

  if (!email) {
    return { error: 'Email is required' };
  }

  try {
    // This adds the person to your Loops contact list
    // Fixed: Passing a single object to match the updated SDK type definition
    await loops.createContact({
      email: email,
      source: 'Website Footer',
      userGroup: 'Newsletter'
    });

    return { success: true };
  } catch (error) {
    console.error('Loops Newsletter Error:', error);
    return { error: 'Failed to subscribe. Please try again later.' };
  }
}
