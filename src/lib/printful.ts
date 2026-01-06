/**
 * Printful API Library for RGRM Boutique
 * Handles automated fulfillment for physical certificates.
 */

const PRINTFUL_API_URL = 'https://api.printful.com';

if (!process.env.PRINTFUL_ACCESS_TOKEN) {
  console.warn('PRINTFUL_ACCESS_TOKEN is missing from environment variables.');
}

export const printful = {
  /**
   * Sends a request to the Printful API
   */
  async request(endpoint: string, method = 'GET', body?: any) {
    const response = await fetch(`${PRINTFUL_API_URL}${endpoint}`, {
      method,
      headers: {
        'Authorization': `Bearer ${process.env.PRINTFUL_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Printful API Error: ${data.error?.message || response.statusText}`);
    }

    return data.result;
  },

  /**
   * Creates a draft order in Printful
   * This is usually triggered by your Stripe Webhook after a successful sale.
   */
  async createOrder(customerData: any, itemVariantId: number) {
    return this.request('/orders', 'POST', {
      recipient: {
        name: customerData.name,
        email: customerData.email,
        address1: customerData.address.line1,
        city: customerData.address.city,
        state_code: customerData.address.state,
        country_code: customerData.address.country,
        zip: customerData.address.postal_code,
      },
      items: [
        {
          variant_id: itemVariantId,
          quantity: 1,
        },
      ],
    });
  },
};
