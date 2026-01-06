const PRINTFUL_API_URL = 'https://api.printful.com';

export const printful = {
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
      throw new Error(`Printful Error: ${data.error?.message || response.statusText}`);
    }

    return data.result;
  },

  // Example: Use this in your webhook to automate fulfillment
  async createOrder(customer: any, variantId: number) {
    return this.request('/orders', 'POST', {
      recipient: {
        name: customer.name,
        email: customer.email,
        address1: customer.address.line1,
        city: customer.address.city,
        country_code: customer.address.country,
        zip: customer.address.postal_code,
      },
      items: [{ variant_id: variantId, quantity: 1 }],
    });
  }
};

