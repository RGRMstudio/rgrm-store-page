'use server';

import { revalidatePath } from 'next/cache';

/**
 * Bauhaus Registry Action
 * Handles the creation of new design identifiers for raguiromo.store
 */
export async function createRegistryEntry(formData: FormData) {
  const identifier = formData.get('identifier');
  const metadata = formData.get('metadata');

  try {
    // 1. Log the registry intent
    console.log(`[Bauhaus Protocol] Registering: ${identifier}`);

    // 2. Logic for Stripe/Printful or Database would go here
    // Example: await db.insert(...)

    // 3. Purge the cache to show the new registry entry immediately
    revalidatePath('/');
    
    return { success: true, message: "Entry registered to Bauhaus Protocol" };
  } catch (error) {
    console.error("Registry Error:", error);
    return { success: false, error: "Protocol validation failed" };
  }
}
