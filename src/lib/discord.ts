export async function sendNotification(message: string) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.warn('Discord Webhook URL is missing. Skipping notification.');
    return;
  }

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `🔔 **Boutique Alert:** ${message}`,
      }),
    });
  } catch (error) {
    console.error('Failed to send Discord notification:', error);
  }
}
