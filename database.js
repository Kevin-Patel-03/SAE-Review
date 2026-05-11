// ============================================================
// BUSINESS INFORMATION – EDIT THIS SECTION
// ============================================================
const BUSINESS = {
  name: "Shree Ambica Enterprise",
  location: "Bakrol, Ahmedabad",
  tagline: "Welding Rods, MIG/TIG Wire & Accessories",
  owner: "Kirtibhai Patel",
  googleReviewUrl: "https://g.page/r/CXpEEDu8u5ZSEBM/review"
};

// ============================================================
// PRODUCT DATABASE – ADD OR REMOVE ITEMS AS YOU LIKE
// ============================================================
const PRODUCTS = {
  rods: [
    "E6013 electrodes", "E7018 rods", "stainless steel rods", "cast iron welding rods",
    "hardfacing electrodes", "low‑hydrogen rods", "cellulosic rods", "mild steel rods"
  ],
  mig: [
    "ER70S-6 MIG wire", "flux‑core MIG wire", "copper‑coated wire", "aluminium MIG wire",
    "stainless MIG wire", "gasless flux wire", "0.8mm MIG wire", "1.2mm MIG wire"
  ],
  tig: [
    "ER308L TIG filler", "ER316L rod", "ER70S-2 wire", "ER5356 aluminium rod",
    "nickel alloy TIG wire", "ER309L rod", "copper TIG wire"
  ],
  accessories: [
    "auto‑darkening helmet", "leather welding gloves", "magnetic clamps", "grinding discs",
    "gas regulator", "safety glasses", "welding apron", "chipping hammer"
  ],
  torch: [
    "cutting torch set", "oxygen regulator", "cutting tips", "flashback arrestors",
    "propane torch handle", "gouging torch"
  ],
  service: [
    "customer service", "technical advice", "fast billing", "product guidance",
    "after‑sales support", "knowledgeable staff", "quick delivery"
  ],
  owner: [
    `${BUSINESS.owner}'s advice`, "his honesty", "his technical knowledge", "his integrity",
    "his personal care", `${BUSINESS.owner} bhai's expertise`
  ],
  value: [
    "competitive pricing", "value for money", "cost savings", "price‑to‑quality ratio",
    "bulk discounts", "affordable rates"
  ],
  recommend: [
    "quality products", "wide range", "excellent service", "customer focus",
    "reliability", "consistent experience"
  ],
  products: [  // fallback for "Products" category
    "welding rods", "MIG wire", "TIG filler", "safety gear", "grinding discs",
    "electrode holders", "welding helmets"
  ]
};

// ============================================================
// PHRASE LISTS – YOU CAN CUSTOMIZE THESE TOO
// ============================================================
const PHRASES = {
  performance: [
    "smooth arc", "clean beads", "low spatter", "deep penetration", "excellent fusion",
    "consistent feed", "stable arc", "easy slag removal"
  ],
  praise: [
    "outstanding", "flawless", "reliable", "professional grade", "top‑tier",
    "exceptional", "impressive", "superior"
  ],
  satisfaction: [
    "very happy", "extremely satisfied", "delighted", "pleasantly surprised",
    "impressed", "grateful", "confident"
  ],
  shopNames: [
    BUSINESS.name, "this welding shop", "this place", `${BUSINESS.owner}'s shop`,
    "Shree Ambica", "the Bakrol store"
  ]
};

// ============================================================
// FILTER BUTTONS CONFIGURATION (kept for compatibility)
// ============================================================
const FILTER_CATEGORIES = [
  { key: "all", label: "All" },
  { key: "products", label: "Products" },
  { key: "mig", label: "MIG Wire" },
  { key: "tig", label: "TIG Wire" },
  { key: "rods", label: "Welding Rods" },
  { key: "rods", label: "Casting Rods", subHint: "Casting Rods" },
  { key: "rods", label: "Cutting Rods", subHint: "Cutting Rods" },
  { key: "torch", label: "Cutting Torch", subHint: "Cutting Torch" },
  { key: "accessories", label: "Accessories" },
  { key: "service", label: "Service" },
  { key: "owner", label: "Owner (Kirtibhai Patel)" },
  { key: "value", label: "Value" },
  { key: "recommend", label: "Recommend" }
];