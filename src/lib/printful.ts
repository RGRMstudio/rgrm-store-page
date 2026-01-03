/**
 * RaGuiRoMo Store: Dual-Printful Account Engine
 * Handles fulfillment routing between Store A001 and A002.
 */

export const getPrintfulToken = (storeId: string): string => {
  const token = storeId === "A002" 
    ? process.env.PRINTFUL_STORE_A002_KEY 
    : process.env.PRINTFUL_STORE_A001_KEY;

  if (!token) {
    throw new Error(`Critical Error: Printful API key for ${storeId} is missing.`);
  }

  return token;
};

export const printfulRequest = async (storeId: string, endpoint: string, options: RequestInit = {}) => {
  const token = getPrintfulToken(storeId);
  
  const response = await fetch(`https://api.printful.com/${endpoint}`, {
    ...options,
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Printful API Error (${storeId}): ${errorData.error?.message || response.statusText}`);
  }

  return response.json();
};
