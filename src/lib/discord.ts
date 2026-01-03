/**
 * RaGuiRoMo Store: Discord Notification Utility
 * Provides a standardized way to send rich embeds to your Discord channel.
 */

export const sendDiscordNotification = async (
  title: string, 
  description: string, 
  color: number = 0x00ff00 // Defaults to Green for success
) => {
  // Retrieve the Webhook URL from your Vercel Environment Variables
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn("⚠️ Discord Webhook URL is missing. Skipping notification.");
    return;
  }

  // Define the Embed payload for a professional look
  const payload = {
    embeds: [
      {
        title: title,
        description: description,
        color: color,
        timestamp: new Date().toISOString(),
        footer: {
          text: "RaGuiRoMo Store | raguiromo.store",
        },
      },
    ],
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Discord Webhook Error: ${response.status} - ${errorText}`);
    }
  } catch (error) {
    console.error("Critical failure sending Discord notification:", error);
  }
};
