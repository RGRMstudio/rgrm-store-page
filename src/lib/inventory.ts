/**
 * RGRM // INVENTORY REGISTRY (FALLBACK)
 * This file serves as the fail-safe data source for the selection module.
 * It follows the 'Study' schema defined for the Sanity CMS integration.
 */

// --- 1. DATA TYPE DEFINITION ---
export interface Product {
  id: string;               // e.g., 'STUDY-001'
  name: string;             // Designation
  price: number;            // Acquisition Cost
  status: 'AVAILABLE' | 'LOW STOCK' | 'SOLD OUT';
  image: string;            // Asset path or Cloud URL
  specs: string;            // Technical specifications summary
  description: string;      // Tactical Analysis
  material?: string;        // Material Composition
  fit?: string;             // Fit Profile
  origin?: string;          // Manufacturing Origin
  printfulId?: string;      // Store 002: 17181557 variant ID
}

// --- 2. THE MASTER INVENTORY (BLUEPRINT) ---
export const INVENTORY: Product[] = [
  {
    id: 'STUDY-001',
    name: 'KINETIC SHELL V.1',
    price: 485,
    status: 'AVAILABLE',
    image: '/assets/inventory/study-001.jpg',
    specs: '3L NYLON / WATER-RESISTANT / MODULAR',
    description: 'A high-mobility outer shell engineered for urban precipitation. Features a modular hood system and integrated sling for transitional carry.',
    material: '85% Polyamide, 15% Elastane',
    fit: 'Boxy / Technical',
    origin: 'Portugal',
    printfulId: '17181557-01'
  },
  {
    id: 'STUDY-002',
    name: 'STRUCTURAL TROUSER',
    price: 320,
    status: 'LOW STOCK',
    image: '/assets/inventory/study-002.jpg',
    specs: 'CORDURA® FABRIC / ARTICULATED KNEES',
    description: 'High-tenacity trousers designed for mechanical stress. Tension-point reinforcement at all major joints with multi-pocket deployment.',
    material: '100% Cordura Nylon',
    fit: 'Tapered / Articulated',
    origin: 'Portugal',
    printfulId: '17181557-02'
  },
  {
    id: 'STUDY-003',
    name: 'MODULAR CARGO UNIT',
    price: 210,
    status: 'SOLD OUT',
    image: '/assets/inventory/study-003.jpg',
    specs: 'PALS COMPATIBLE / WATERPROOF ZIPS',
    description: 'External storage module designed for attachment to the Kinetic Shell system. Waterproof zippers and rapid-access pull tabs.',
    material: 'X-Pac® VX21',
    fit: 'N/A',
    origin: 'Japan',
    printfulId: '17181557-03'
  },
  {
    id: 'STUDY-004',
    name: 'IDENTITY LOGO MODULE',
    price: 85,
    status: 'AVAILABLE',
    image: '/assets/inventory/study-004.jpg',
    specs: 'HEAVY COTTON / SILICON PRINT',
    description: 'Identity Registry Module 002 core graphic. High-density silicon print on 300GSM organic cotton.',
    material: '100% Organic Cotton',
    fit: 'Standard / Structured',
    origin: 'Italy',
    printfulId: '17181557-04'
  }
];

// --- 3. OPERATIONAL UTILITIES ---

/**
 * Retrieves a single product by its unique Study ID.
 */
export const getProductById = (id: string): Product | undefined => {
  return INVENTORY.find(item => item.id === id);
};

/**
 * Returns all products that are currently in a shippable state.
 */
export const getAvailableStock = (): Product[] => {
  return INVENTORY.filter(item => item.status !== 'SOLD OUT');
};

/**
 * Returns the total count of distinct items in the fallback registry.
 */
export const getInventoryCount = (): number => {
  return INVENTORY.length;
};
