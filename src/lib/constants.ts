/**
 * RGRM // SYSTEM CONSTANTS
 * Centralized registry for brand identity and operational metadata.
 */

export const RGRM_IDENTITY = {
  fullName: "RGRMstudio",
  shortName: "RGRM",
  tagline: "STRUCTURAL STUDIES // IDENTITY REGISTRY",
  founder: "A. R. M.", // Update to your specific designation
  established: "2024",
  mission: "RGRM IS A HIGH-PERFORMANCE, AUTONOMOUS E-COMMERCE ENGINE DESIGNED FOR THE DISTRIBUTION OF PHYSICAL IDENTITY MODULES.",
  location: "SECTOR_001",
};

export const RGRM_PHASES = {
  current: {
    id: "001",
    name: "WE ENGINEER SILHOUETTES",
    status: "ACTIVE",
    description: "INITIAL DEPLOYMENT: Establishing the structural foundation through core textile studies and silhouette engineering.",
  },
  upcoming: {
    id: "002",
    name: "EXPANSION & INTEGRATION",
    status: "PENDING",
    description: "Phase 002 focuses on modular luggage systems and advanced weather-resistant outerwear.",
  },
};

export const RGRM_CHANNELS = {
  instagram: "https://instagram.com/rgrmstudio",
  x: "https://x.com/rgrmstudio",
  linkedin: "https://linkedin.com/company/rgrmstudio",
  registry: "/registry",
};

// Fulfillment & Transaction Data
export const RGRM_PROTOCOL = {
  storeId: "17181557", // Printful Store 002
  currency: "USD",
  region: "GLOBAL",
  encryption: "AES-256",
};

// UI & Aesthetic Constraints
export const RGRM_THEME = {
  colors: {
    primary: "#000000",
    accent: "#BC2026", // RGRM Red
    secondary: "#FFFFFF",
  },
  grid: {
    opacity: 0.05,
    size: "40px",
  },
};

/**
 * TECHNICAL NOTE: 
 * These constants are used by Server Components for SEO 
 * and Client Components for UI rendering.
 */
