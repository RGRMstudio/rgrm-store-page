/**
 * RaGuiRoMo Store: Discord Notification Engine
 * Sends professional embeds for sales and system status.
 */

export const sendDiscordNotification = async (title: string, description: string, color: number = 0x00ff00) => {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error("Discord Webhook URL is missing in Environment Variables.");
    return;
  }

  const payload = {
    embeds: [
      {
        title: `🛍️ ${title}`,
        description: description,
        color: color,
        timestamp: new Date().toISOString(),
        footer: { text: "RaGuiRoMo Store System" },
      },
    ],
  };

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};
