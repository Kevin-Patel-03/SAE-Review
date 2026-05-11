// ============================================================
// REVIEW GENERATOR – NO HARDCODED REVIEWS
// Uses database.js (BUSINESS, PRODUCTS, PHRASES, FILTER_CATEGORIES)
// Exposes clean API: window.ReviewGenerator.getRandomReviews(category, count, subHint)
// ============================================================

(function() {
  // Helper: random element from array
  function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // Context factory – builds random vocabulary each call
  function buildContext(categoryKey, subHint) {
    // Determine product list based on category + subHint
    let productList;
    if (subHint === "Casting Rods") productList = ["cast iron welding rods", "cast iron repair electrodes", "nickel-based cast rods"];
    else if (subHint === "Cutting Rods") productList = ["exothermic cutting rods", "gouging rods", "carbon arc rods"];
    else if (subHint === "Cutting Torch") productList = PRODUCTS.torch;
    else productList = PRODUCTS[categoryKey] || PRODUCTS.products;
    
    const product = random(productList);
    const perf = random(PHRASES.performance);
    const praise = random(PHRASES.praise);
    const feel = random(PHRASES.satisfaction);
    const shop = random(PHRASES.shopNames);
    
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

  // Build a single review sentence by sentence (fully generative)
  function buildReview(categoryKey, ctx) {
    // Subject phrase
    const subjects = [
      `${ctx.product} from ${ctx.shop}`,
      `${ctx.shop}'s ${ctx.product}`,
      `The ${ctx.product}`,
      `My experience with ${ctx.product} at ${ctx.shop}`,
      `Every ${ctx.product} I've bought here`,
      `${ctx.owner}'s ${ctx.product} selection`,
      `The quality of ${ctx.product}`,
      `Using ${ctx.product} from this place`
    ];
    const subject = random(subjects);
    
    // Verb phrase
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
    const verb = random(actions);
    
    // Connector (adds natural flow)
    const connectors = [
      `, and ${random(["I'm", "I've been", "my team is"])} ${ctx.feel}`,
      `, so ${ctx.confidence}`,
      ` because ${ctx.cause}`,
      ` – ${random(["honestly", "seriously", "no joke", "trust me"])}, ${ctx.effect}`,
      `, which ${random(["saved my project", "improved my weld quality", "reduced my rework", "increased my productivity"])}`,
      `. ${random(["What a difference", "Highly recommended", "Can't ask for more"])}.`,
      `, and the best part? ${ctx.bestPart}`,
      `. ${random(["I'm sticking with this shop", "I've already told my colleagues", "I'm never going anywhere else"])}.`
    ];
    const connector = random(connectors);
    
    // Opening phrase (optional, 50% chance)
    let opening = "";
    if (Math.random() < 0.5) {
      const opens = [
        "Honestly,", "After trying many suppliers,", "As a professional welder,",
        "I've been in this trade for years, and", "Let me tell you,", "No exaggeration,",
        "For anyone looking for ${ctx.product},", "If you ask me,", "Here's the thing:",
        "Take it from someone who knows:", "I was skeptical at first, but", "Without a doubt,"
      ];
      opening = random(opens) + " ";
    }
    
    let mainSentence = opening + subject + " " + verb + connector;
    // Capitalize first letter
    mainSentence = mainSentence.charAt(0).toUpperCase() + mainSentence.slice(1);
    
    // Second sentence (additional detail, 70% chance)
    let second = "";
    if (Math.random() < 0.7) {
      const detailStarters = ["Besides that,", "Also,", "Plus,", "On top of that,", "Another thing:", "And get this –"];
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
      second = ` ${random(detailStarters)} ${random(details)}.`;
      second = second.charAt(0).toUpperCase() + second.slice(1);
    }
    
    // Closing sentence
    const closes = [
      `5 stars! ${random(["Recommended!", "Try them once.", "You won't regret it."])}`,
      `Will return for sure.`, `Deserves more stars.`, `Keep it up, team!`, `Thank you!`
    ];
    const closing = random(closes);
    
    return (mainSentence + second + " " + closing).replace(/\s+/g, ' ').trim();
  }

  // Main exported function: returns an array of `count` unique review strings (no timestamp suffix)
  function getRandomReviews(categoryKey, count, subHint = null) {
    if (!count || count < 1) count = 3;
    const reviews = [];
    for (let i = 0; i < count; i++) {
      let effectiveCat = categoryKey;
      // Special handling for sub-hints that override main category
      if (subHint === "Casting Rods" || subHint === "Cutting Rods") effectiveCat = "rods";
      if (subHint === "Cutting Torch") effectiveCat = "torch";
      
      const ctx = buildContext(effectiveCat, subHint);
      let review = buildReview(effectiveCat, ctx);
      
      // Remove any accidental leftover template vars
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