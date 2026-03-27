"use server";

import { LoopsClient } from 'loops';

const loops = new LoopsClient(process.env.LOOPS_API_KEY!);

export async function subscribe(formData: FormData) {
  const email = formData.get("email") as string;
  
  if (!email) return { success: false };

  try {
    // This adds the person to your Loops contact list
    await loops.createContact(email, {
      source: 'Website Footer',
      userGroup: 'Newsletter'
    });
    return { success: true };
  } catch (error) {
    console.error("Newsletter Error:", error);
    return { success: false };
  }
}
