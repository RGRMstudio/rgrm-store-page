const STORE_KEYS: Record<string, string | undefined> = {
  'RGRMStoreA001': process.env.PRINTFUL_STORE_A001_KEY,
  'RGRMStoreA002': process.env.PRINTFUL_STORE_A002_KEY,
};

export async function createPrintfulOrder(storeSource: string, orderData: any) {
  const apiKey = STORE_KEYS[storeSource];
  
  if (!apiKey) throw new Error(`API Key for ${storeSource} not found.`);

  const response = await fetch('https://api.printful.com/orders', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });

  return response.json();
}
