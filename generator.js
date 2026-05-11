// ============================================================
// PROFESSIONAL REVIEW GENERATOR – ENHANCED VERSION
// Generates coherent, varied, and natural-sounding reviews
// Uses database.js for business info and product lists
// ============================================================

(function() {
  // ---------- HELPER: random element from array ----------
  const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
  
  // ---------- EXPANDED VOCABULARY (prevents repetition) ----------
  const PERFORMANCE = {
    arc: [
      "smooth arc", "stable arc", "consistent arc", "soft arc", "controlled arc",
      "responsive arc", "low‑spatter arc", "clean arc start", "instant arc ignition"
    ],
    bead: [
      "clean beads", "uniform beads", "tight beads", "aesthetic beads", "flake‑free beads",
      "narrow beads", "well‑formed beads", "smooth beads"
    ],
    penetration: [
      "deep penetration", "consistent penetration", "full fusion", "excellent root penetration",
      "even penetration", "strong bond"
    ],
    wire: [
      "consistent feed", "jam‑free feeding", "smooth wire travel", "no birdnesting",
      "reliable wire delivery", "steady wire flow"
    ],
    general: [
      "low spatter", "minimal cleanup", "excellent slag removal", "superior weld profile",
      "high deposition rate", "energy‑efficient burn", "reduced post‑weld work"
    ]
  };
  
  const PRAISE_ADJECTIVES = [
    "outstanding", "exceptional", "superior", "premium", "flawless", "impeccable",
    "top‑notch", "high‑grade", "professional", "industrial‑strength", "dependable",
    "remarkable", "impressive", "uncompromising", "first‑rate", "exemplary"
  ];
  
  const SATISFACTION = [
    "thoroughly satisfied", "extremely pleased", "genuinely impressed", "very happy",
    "delighted", "grateful for the quality", "confident in my purchase", "reassured",
    "blown away", "sold for life"
  ];
  
  const SHOP_NAMES = []; // will be populated from BUSINESS.name during init
  
  const CAUSE_PHRASES = [
    "they source only genuine materials",
    "the quality control is rigorous",
    "{owner} truly understands welders' needs",
    "every batch is tested before shipping",
    "the ingredients are pharmaceutical‑grade (for rods)",
    "their manufacturing process is ISO‑compliant",
    "they never compromise on raw materials",
    "I've inspected their warehouse – it's immaculate"
  ];
  
  const EFFECT_PHRASES = [
    "my rejection rate dropped to nearly zero",
    "I finish projects in record time",
    "my clients rave about the weld finish",
    "I've reduced my rework by 70%",
    "my welding machine runs cooler and smoother",
    "I've won repeat contracts thanks to the quality"
  ];
  
  const BEST_PART_PHRASES = [
    "the price is very competitive for this quality",
    "they offer bulk discounts without any fuss",
    "delivery is always ahead of schedule",
    "the staff proactively checks if I need anything",
    "they keep a buffer stock of popular items",
    "no minimum order quantity – perfect for small shops"
  ];
  
  const CONFIDENCE_PHRASES = [
    "I confidently recommend them to every fabricator I know",
    "I've become a loyal, long‑term customer",
    "I don't even look at other suppliers anymore",
    "they've earned my complete trust",
    "I refer all my students to this shop",
    "they're the first name on my vendor list"
  ];
  
  const OPENING_PHRASES = [
    "After testing multiple suppliers,", "As a certified welder with 15+ years of experience,",
    "No exaggeration,", "I'll keep this short:", "Here's the honest truth:",
    "Take it from a professional:", "I was hesitant at first, but", "Finally, a place where",
    "If you value your time and money,", "Hands down,", "In my humble opinion,"
  ];
  
  const DETAIL_STARTERS = [
    "Besides that,", "On top of that,", "Another winning point:", "Equally important,",
    "And here's the kicker:", "What's more,", "I should also mention that"
  ];
  
  const DETAIL_ITEMS = [
    "the staff actually understands welding metallurgy",
    "they offer free technical support over the phone",
    "the packaging is robust – no damaged goods",
    "they accept returns without a hassle",
    "they proactively suggest better alternatives",
    "the billing is transparent with no hidden fees"
  ];
  
  const CLOSING_PHRASES = [
    "5 stars, no question.", "Highly recommended without reservations.",
    "Will keep coming back.", "Keep up the great work!",
    "A model for other industrial suppliers.", "Thank you for setting high standards.",
    "You've earned a customer for life.", "Simply the best in Ahmedabad."
  ];
  
  // ---------- SENTENCE TEMPLATES (ensures grammatical correctness) ----------
  // Each template is a function that receives context and returns a string.
  // We'll randomly pick from a set of templates for each part.
  
  function buildSubject(ctx, categoryKey) {
    const templates = [
      () => `${ctx.product} from ${ctx.shop}`,
      () => `${ctx.shop}'s ${ctx.product}`,
      () => `The ${ctx.product}`,
      () => `My experience with ${ctx.product} at ${ctx.shop}`,
      () => `Every ${ctx.product} I've bought here`,
      () => `${ctx.owner}'s ${ctx.product} selection`,
      () => `The quality of ${ctx.product}`,
      () => `Using ${ctx.product} from this place`
    ];
    return random(templates)();
  }
  
  function buildVerbPhrase(ctx, perfOption) {
    const templates = [
      () => `delivers ${perfOption}`,
      () => `gives me ${perfOption} every single time`,
      () => `has been absolutely ${random(PRAISE_ADJECTIVES)}`,
      () => `is consistently ${random(PRAISE_ADJECTIVES)}`,
      () => `exceeds my expectations with ${perfOption}`,
      () => `outperforms any other brand I've used`,
      () => `makes my job significantly easier`,
      () => `saves me hours of grinding and cleanup`,
      () => `has never, ever let me down`,
      () => `works like a precision instrument`,
      () => `offers unbeatable value for its performance`,
      () => `sets a new benchmark in its category`
    ];
    return random(templates)();
  }
  
  function buildConnector(ctx) {
    const templates = [
      () => `, and I'm ${random(SATISFACTION)}`,
      () => `, so ${random(CONFIDENCE_PHRASES)}`,
      () => ` because ${random(CAUSE_PHRASES).replace('{owner}', ctx.owner)}`,
      () => ` – ${random(["honestly", "without exaggeration", "in practice"])}, ${random(EFFECT_PHRASES)}`,
      () => `, which ${random(["has saved my project", "improved my weld consistency", "reduced my post‑weld cleanup", "increased my daily output"])}`,
      () => `. ${random(["What a difference.", "Highly recommended.", "Can't ask for more."])}`,
      () => `, and the best part? ${random(BEST_PART_PHRASES)}`,
      () => `. ${random(["I'm sticking with this shop.", "I've already converted my colleagues.", "I'm never going anywhere else."])}`
    ];
    return random(templates)();
  }
  
  function buildOpening() {
    return Math.random() < 0.6 ? random(OPENING_PHRASES) + " " : "";
  }
  
  function buildDetailSentence(ctx) {
    if (Math.random() > 0.65) return "";
    const starter = random(DETAIL_STARTERS);
    const detail = random(DETAIL_ITEMS);
    return ` ${starter} ${detail}.`;
  }
  
  function buildClosing() {
    return " " + random(CLOSING_PHRASES);
  }
  
  // ---------- CONTEXT FACTORY (with smarter product/performance pairing) ----------
  function buildContext(categoryKey, subHint) {
    // Determine product list
    let productList;
    if (subHint === "Casting Rods") productList = ["cast iron welding rods", "cast iron repair electrodes", "nickel‑based cast rods", "low‑temperature cast rods"];
    else if (subHint === "Cutting Rods") productList = ["exothermic cutting rods", "gouging rods", "carbon arc rods", "air carbon arc rods"];
    else if (subHint === "Cutting Torch") productList = PRODUCTS.torch;
    else productList = PRODUCTS[categoryKey] || PRODUCTS.products;
    
    const product = random(productList);
    
    // Choose a performance descriptor that logically fits the product
    let perf = "";
    if (product.includes("rod") || product.includes("electrode")) {
      perf = random([...PERFORMANCE.arc, ...PERFORMANCE.bead, ...PERFORMANCE.penetration, ...PERFORMANCE.general]);
    } else if (product.includes("wire")) {
      perf = random([...PERFORMANCE.wire, ...PERFORMANCE.arc, ...PERFORMANCE.bead]);
    } else if (product.includes("torch") || product.includes("tip")) {
      perf = random(["precise flame control", "clean cuts", "high‑speed cutting", "low gas consumption"]);
    } else {
      perf = random([...PERFORMANCE.general, ...PERFORMANCE.arc, ...PERFORMANCE.bead]);
    }
    
    const praise = random(PRAISE_ADJECTIVES);
    const feel = random(SATISFACTION);
    const shop = random(SHOP_NAMES);
    
    return {
      product, perf, praise, feel, shop,
      random,
      cause: random(CAUSE_PHRASES).replace('{owner}', BUSINESS.owner),
      effect: random(EFFECT_PHRASES),
      bestPart: random(BEST_PART_PHRASES),
      confidence: random(CONFIDENCE_PHRASES),
      owner: BUSINESS.owner,
      location: BUSINESS.location
    };
  }
  
  // ---------- MAIN REVIEW BUILDING (coherent assembly) ----------
  function buildReview(categoryKey, ctx) {
    const subject = buildSubject(ctx, categoryKey);
    const verb = buildVerbPhrase(ctx, ctx.perf);
    const connector = buildConnector(ctx);
    const opening = buildOpening();
    
    let mainSentence = opening + subject + " " + verb + connector;
    // Ensure first letter capital and proper punctuation
    mainSentence = mainSentence.charAt(0).toUpperCase() + mainSentence.slice(1);
    if (!mainSentence.endsWith('.') && !mainSentence.endsWith('!') && !mainSentence.endsWith('?')) {
      mainSentence += '.';
    }
    
    const detail = buildDetailSentence(ctx);
    const closing = buildClosing();
    
    let fullReview = mainSentence + detail + closing;
    // Cleanup: remove double spaces and fix punctuation spacing
    fullReview = fullReview.replace(/\s+/g, ' ').replace(/\s\./g, '.').replace(/\s\,/g, ',').trim();
    return fullReview;
  }
  
  // ---------- EXPORTED API ----------
  function getRandomReviews(categoryKey, count = 3, subHint = null) {
    if (!count || count < 1) count = 3;
    // Pre-fill shop names from BUSINESS.name once (avoid empty array)
    if (SHOP_NAMES.length === 0) {
      SHOP_NAMES.push(
        BUSINESS.name,
        "this welding shop",
        "this place",
        `${BUSINESS.owner}'s shop`,
        "Shree Ambica",
        "the Bakrol store",
        "their Bakrol outlet"
      );
    }
    
    const reviews = [];
    for (let i = 0; i < count; i++) {
      let effectiveCat = categoryKey;
      if (subHint === "Casting Rods" || subHint === "Cutting Rods") effectiveCat = "rods";
      if (subHint === "Cutting Torch") effectiveCat = "torch";
      
      const ctx = buildContext(effectiveCat, subHint);
      let review = buildReview(effectiveCat, ctx);
      // Remove any lingering template placeholders (just in case)
      review = review.replace(/\$\{.*?\}/g, '').replace(/\s+/g, ' ').trim();
      reviews.push(review);
    }
    return reviews;
  }
  
  // Expose globally
  window.ReviewGenerator = {
    getRandomReviews: getRandomReviews
  };
})();