'use server';

export async function subscribeToRegistry(formData: FormData) {
  const email = formData.get('email');

  if (!email || typeof email !== 'string') {
    return { error: 'A valid email blueprint is required.' };
  }

  try {
    const response = await fetch('https://app.loops.so/api/v1/contacts/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.LOOPS_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        userGroup: 'Phase 01 Registry',
        source: 'RGRM Selection Page'
      }),
    });

    if (!response.ok) {
      throw new Error('Communication failure with Loops.');
    }

    return { success: true };
  } catch (error) {
    console.error('Registry Error:', error);
    return { error: 'Structural error during registration.' };
  }
}
