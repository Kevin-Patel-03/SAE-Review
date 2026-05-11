// ============================================================
// TRULY GENERATIVE REVIEW ENGINE – NO FIXED TEMPLATES
// Works with database.js – uses BUSINESS, PRODUCTS, PHRASES, FILTER_CATEGORIES
// ============================================================

let activeCategory = "all";
let searchQuery = "";
let currentReviews = [];
let selectedIdx = null;
let isGenerating = false;

// Helper: get random element
function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Helper to get display label for a category
function getCategoryLabel(catKey, subHint = null) {
  if (subHint === "Casting Rods") return "Casting Rods";
  if (subHint === "Cutting Rods") return "Cutting Rods";
  if (subHint === "Cutting Torch") return "Cutting Torch";
  const labels = {
    all: "All", products: "Products", mig: "MIG Wire", tig: "TIG Wire",
    rods: "Welding Rods", accessories: "Accessories", service: "Service",
    owner: BUSINESS.owner, value: "Value", recommend: "Recommend", torch: "Cutting Torch"
  };
  return labels[catKey] || catKey;
}

// ========== GRAMMAR COMPONENTS ==========

// Subject phrases (things being praised)
function getSubject(category, ctx) {
  const subjOptions = [
    `${ctx.product} from ${ctx.shop}`,
    `${ctx.shop}'s ${ctx.product}`,
    `The ${ctx.product}`,
    `My experience with ${ctx.product} at ${ctx.shop}`,
    `Every ${ctx.product} I've bought here`,
    `${ctx.owner}'s ${ctx.product} selection`,
    `The quality of ${ctx.product}`,
    `Using ${ctx.product} from this place`
  ];
  return subjOptions[Math.floor(Math.random() * subjOptions.length)];
}

// Action verbs + compliment core
function getVerbPhrase(ctx) {
  const actions = [
    `delivers ${ctx.perf}`,
    `gives me ${ctx.perf} every time`,
    `has been ${ctx.praise}`,
    `is absolutely ${ctx.praise}`,
    `exceeds my expectations with ${ctx.perf}`,
    `outperforms any other brand I've tried`,
    `makes my work so much easier`,
    `saves me time and money`,
    `has never let me down`,
    `works like a charm`,
    `is worth every rupee`,
    `stands out from the competition`
  ];
  return actions[Math.floor(Math.random() * actions.length)];
}

// Connector clauses (middle of sentence)
function getConnector(ctx) {
  const connectors = [
    `, and ${ctx.random(["I'm", "I've been", "my team is"])} ${ctx.feel}`,
    `, so ${ctx.confidence}`,
    ` because ${ctx.cause}`,
    ` – ${ctx.random(["honestly", "seriously", "no joke", "trust me"])}, ${ctx.effect}`,
    `, which ${ctx.random(["saved my project", "improved my weld quality", "reduced my rework", "increased my productivity"])}`,
    `. ${ctx.random(["What a difference", "Highly recommended", "Can't ask for more"])}.`,
    `, and the best part? ${ctx.bestPart}`,
    `. ${ctx.random(["I'm sticking with this shop", "I've already told my colleagues", "I'm never going anywhere else"])}.`
  ];
  return connectors[Math.floor(Math.random() * connectors.length)];
}

// Opening phrases (first few words)
function getOpening(ctx) {
  const opens = [
    `Honestly,`,
    `After trying many suppliers,`,
    `As a professional welder,`,
    `I've been in this trade for years, and`,
    `Let me tell you,`,
    `No exaggeration,`,
    `For anyone looking for ${ctx.product},`,
    `If you ask me,`,
    `Here's the thing:`,
    `Take it from someone who knows:`,
    `I was skeptical at first, but`,
    `Without a doubt,`,
    `One thing I appreciate is that`,
    `Finally, a place where`
  ];
  return opens[Math.floor(Math.random() * opens.length)];
}

// Closing emphasis
function getClosing(ctx) {
  const closes = [
    `${ctx.random(["Will return.", "Deserves more stars.", "Keep it up!", "Thank you team!"])}`,
    `5 stars! ${ctx.random(["Recommended!", "Try them once.", "You won't regret it."])}`,
    
  ];
  return closes[Math.floor(Math.random() * closes.length)];
}

// Build a full review sentence by sentence
function buildReview(category, ctx) {
  let sentences = [];
  
  // Sentence 1: main praise
  let sent1 = "";
  if (Math.random() < 0.5) {
    sent1 = `${getOpening(ctx)} ${getSubject(category, ctx)} ${getVerbPhrase(ctx)}${getConnector(ctx)}`;
  } else {
    sent1 = `${getSubject(category, ctx)} ${getVerbPhrase(ctx)}${getConnector(ctx)}`;
  }
  sentences.push(sent1);
  
  // Sentence 2: additional detail (optional 75% chance)
  if (Math.random() < 0.75) {
    const detailStarters = [
      `Besides that,`,
      `Also,`,
      `Plus,`,
      `On top of that,`,
      `Another thing:`,
      `And get this –`
    ];
    const details = [
      `the ${ctx.perf} is ${ctx.praise}`,
      `their prices are ${ctx.praise}`,
      `the staff actually knows what they're talking about`,
      `I've recommended this place to ${random(["three", "five", "several"])} friends already`,
      `${ctx.owner} even called to check if everything worked fine`,
      `they always have everything in stock, even special items`,
      `the delivery was faster than expected`,
      `I saved ${random(["10%", "15%", "a good amount"])} compared to my old supplier`
    ];
    let sent2 = `${random(detailStarters)} ${random(details)}.`;
    sentences.push(sent2);
  }
  
  // Sentence 3: closing (always)
  sentences.push(getClosing(ctx));
  
  return sentences.join(" ");
}

// ========== CONTEXT FACTORY (builds random vocabulary each call) ==========
function buildContext(category, subHint, index) {
  // Determine product list based on category
  let productList;
  if (subHint === "Casting Rods") productList = ["cast iron welding rods", "cast iron repair electrodes"];
  else if (subHint === "Cutting Rods") productList = ["exothermic cutting rods", "gouging rods"];
  else if (subHint === "Cutting Torch") productList = PRODUCTS.torch;
  else productList = PRODUCTS[category] || PRODUCTS.products;
  
  const product = productList[Math.floor(Math.random() * productList.length)];
  const perf = random(PHRASES.performance);
  const praise = random(PHRASES.praise);
  const feel = random(PHRASES.satisfaction);
  const shop = random(PHRASES.shopNames);
  
  // Extended vocabulary for dynamic clauses
  const causeOptions = [
    `the ${perf} is ${praise}`,
    `they use only genuine materials`,
    `${BUSINESS.owner} knows exactly what welders need`,
    `the quality control is top-notch`,
    `I've never had a single defective piece`,
    `my rejection rate dropped to near zero`
  ];
  
  const effectOptions = [
    `my clients are impressed with the finish`,
    `I finish jobs faster now`,
    `I spend less time on post-weld cleanup`,
    `my welding machine runs smoother`,
    `I've won more contracts because of the quality`
  ];
  
  const bestPartOptions = [
    `the price is very reasonable`,
    `they deliver right to my workshop`,
    `they offer bulk discounts without asking`,
    `the staff remembers my name and my needs`
  ];
  
  const confidenceOptions = [
    `I'm confident recommending them to anyone`,
    `I've become a loyal customer`,
    `I don't look anywhere else now`,
    `they've earned my trust completely`
  ];
  
  return {
    product, perf, praise, feel, shop,
    random: (arr) => arr[Math.floor(Math.random() * arr.length)],
    cause: random(causeOptions),
    effect: random(effectOptions),
    bestPart: random(bestPartOptions),
    confidence: random(confidenceOptions),
    owner: BUSINESS.owner,
    location: BUSINESS.location
  };
}

// ========== MAIN GENERATION ==========
function generateSingleReview(category, subHint, index) {
  let ctx = buildContext(category, subHint, index);
  let reviewText = "";
  
  if (category === "all") {
    // Randomly pick a real category for variety
    const cats = ["rods", "mig", "tig", "accessories", "torch", "service", "owner", "value", "recommend", "products"];
    const realCat = random(cats);
    ctx = buildContext(realCat, subHint, index);
    reviewText = buildReview(realCat, ctx);
  } else {
    reviewText = buildReview(category, ctx);
  }
  
  // Add unique suffix to guarantee no two reviews are identical (removed on copy)
  reviewText += ` (${Date.now()}-${index}-${Math.random().toString(36).substring(2,6)})`;
  return reviewText;
}

// Generate 3 fresh reviews
function generateFreshReviews() {
  if (isGenerating) return;
  isGenerating = true;
  const gridDiv = document.getElementById("reviews-grid");
  gridDiv.innerHTML = `<div class="loading-spinner">✨ Building fresh reviews from scratch...</div>`;

  let subHint = null;
  const activeBtn = document.querySelector(".filter-btn.active");
  if (activeBtn) {
    const bt = activeBtn.innerText.trim();
    if (bt === "Casting Rods") subHint = "Casting Rods";
    else if (bt === "Cutting Rods") subHint = "Cutting Rods";
    else if (bt === "Cutting Torch") subHint = "Cutting Torch";
  }
  let effectiveCat = activeCategory;
  if (subHint === "Casting Rods" || subHint === "Cutting Rods") effectiveCat = "rods";
  if (subHint === "Cutting Torch") effectiveCat = "torch";

  setTimeout(() => {
    try {
      const reviews = [];
      for (let i = 0; i < 3; i++) {
        const revText = generateSingleReview(effectiveCat, subHint, i);
        const catLabel = getCategoryLabel(effectiveCat, subHint);
        reviews.push({ text: revText, categoryLabel: catLabel });
      }
      currentReviews = reviews;
      selectedIdx = 0;
      renderReviews();
    } catch (err) {
      console.error(err);
      gridDiv.innerHTML = `<div class="empty-state">⚠️ Error: ${err.message}. Check console for details.</div>`;
    } finally {
      isGenerating = false;
    }
  }, 10);
}

// Render reviews in the grid
function renderReviews() {
  const grid = document.getElementById("reviews-grid");
  let filtered = currentReviews;
  if (searchQuery.trim()) {
    const sq = searchQuery.toLowerCase();
    filtered = filtered.filter(r => r.text.toLowerCase().includes(sq));
  }
  
  const badge = document.querySelector(".count-badge");
  if (badge) badge.innerText = filtered.length + " fresh reviews";

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="empty-state">🤖 No matching reviews. Try a different category or generate again.</div>`;
    document.getElementById("selected-text").innerHTML = "✨ No review selected. Tap any review above.";
    selectedIdx = null;
    return;
  }
  
  grid.innerHTML = filtered.map((rev, idx) => {
    const isSelected = (selectedIdx === idx);
    return `<div class="review-card ${isSelected ? 'selected' : ''}" data-idx="${idx}">
      <div class="tag">${escapeHtml(rev.categoryLabel)}</div>
      <p>${escapeHtml(rev.text)}</p>
    </div>`;
  }).join("");
  
  document.querySelectorAll(".review-card").forEach(card => {
    card.addEventListener("click", (e) => {
      const idx = parseInt(card.dataset.idx, 10);
      if (!isNaN(idx) && filtered[idx]) {
        selectedIdx = idx;
        document.getElementById("selected-text").innerHTML = escapeHtml(filtered[idx].text);
        renderReviews();
      }
    });
  });
  
  if (selectedIdx !== null && filtered[selectedIdx]) {
    document.getElementById("selected-text").innerHTML = escapeHtml(filtered[selectedIdx].text);
  } else if (filtered.length > 0) {
    selectedIdx = 0;
    document.getElementById("selected-text").innerHTML = escapeHtml(filtered[0].text);
    renderReviews();
  }
}

// Copy selected review (removes the unique suffix)
async function copySelected() {
  if (selectedIdx === null || !currentReviews[selectedIdx]) {
    alert("Please select a review first.");
    return;
  }
  let text = currentReviews[selectedIdx].text;
  text = text.replace(/\s+\([0-9]+-[0-9]+-[a-z0-9]+\)$/, '');
  try {
    await navigator.clipboard.writeText(text);
    const statusDiv = document.getElementById("copied-status");
    statusDiv.innerHTML = `<span class="copied-msg">✅ Copied to clipboard! Now paste into Google review.</span>`;
    setTimeout(() => statusDiv.innerHTML = "", 2500);
  } catch {
    alert("Manual copy: select text and press Ctrl+C");
  }
}

function escapeHtml(str) {
  return str.replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}

// Initialize
function init() {
  // Set business info from database.js (already defined globally)
  document.getElementById("business-name").innerText = BUSINESS.name;
  document.getElementById("biz-meta").innerHTML = `${BUSINESS.location} · ${BUSINESS.tagline}`;
  document.getElementById("google-link").href = BUSINESS.googleReviewUrl;
  
  // Build filter buttons if they are not already in DOM (in case index.html doesn't have them)
  const filterContainer = document.getElementById("filters");
  if (filterContainer && filterContainer.children.length === 0 && typeof FILTER_CATEGORIES !== 'undefined') {
    FILTER_CATEGORIES.forEach(cat => {
      const btn = document.createElement("button");
      btn.className = "filter-btn" + (cat.key === "all" ? " active" : "");
      btn.setAttribute("data-cat", cat.key);
      if (cat.subHint) btn.setAttribute("data-sub", cat.subHint);
      btn.innerText = cat.label;
      filterContainer.appendChild(btn);
    });
  }
  
  // Attach event listeners
  document.getElementById("generate-btn").addEventListener("click", generateFreshReviews);
  document.getElementById("copy-btn").addEventListener("click", copySelected);
  document.getElementById("search-input").addEventListener("input", (e) => {
    searchQuery = e.target.value;
    renderReviews();
  });
  document.getElementById("filters").addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn || !btn.dataset.cat) return;
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeCategory = btn.dataset.cat;
    generateFreshReviews();
  });
  
  // Start with initial generation
  generateFreshReviews();
}

// Run when DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}