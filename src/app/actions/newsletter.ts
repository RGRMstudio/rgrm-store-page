'use server';

import { LoopsClient } from 'loops';

const loops = new LoopsClient(process.env.LOOPS_API_KEY as string);

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get('email') as string;

  if (!email) {
    return { error: 'Email is required' };
  }

  try {
    // Loops SDK v3 requires custom fields to be inside the 'properties' object
    await loops.createContact({
      email: email,
      properties: {
        source: 'Website Footer',
        userGroup: 'Newsletter'
      }
    });

    return { success: true };
  } catch (error) {
    console.error('Loops Newsletter Error:', error);
    return { error: 'Failed to subscribe. Please try again later.' };
  }
}
