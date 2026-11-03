const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, 'acskenya-raw.html'), 'utf8');

// Parse all cards inside id="products"
const productsSectionMatch = html.match(/<section[^>]*id=["']products["'][\s\S]*?<\/section>/i);
const products = [];

if (productsSectionMatch) {
  const sectionHtml = productsSectionMatch[0];
  const cardMatches = Array.from(sectionHtml.matchAll(/<div[^>]*class=["']card["'][\s\S]*?<\/div>\s*<\/div>/gi));
  console.log(`Found ${cardMatches.length} raw card matches in products section.`);

  // Regex to extract card contents
  const cardRegex = /<div class="card">([\s\S]*?)<\/div>\s*<\/div>/gi;
  let m;
  let idx = 0;
  while ((m = cardRegex.exec(sectionHtml)) !== null) {
    const cardHtml = m[1];
    const imgMatch = cardHtml.match(/<img[^>]+src=["']([^"']+)["'][^>]*alt=["']([^"']*)["']/i) || cardHtml.match(/<img[^>]+src=["']([^"']+)["']/i);
    const titleMatch = cardHtml.match(/<h4[^>]*>([\s\S]*?)<\/h4>/i);
    const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : '';
    
    // Description p tags
    const pMatches = Array.from(cardHtml.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)).map(p => p[1].replace(/<[^>]+>/g, '').trim());
    const desc = pMatches[0] || '';
    const specs = pMatches[1] || '';

    // Price
    const priceMatch = cardHtml.match(/class=["']price["'][^>]*>([\s\S]*?)<\/div>/i);
    const priceText = priceMatch ? priceMatch[1].replace(/<[^>]+>/g, '').trim() : '';
    const rawPrice = priceText.replace(/[^\d]/g, '');
    const price = rawPrice ? parseInt(rawPrice, 10) : 0;

    const imgSrc = imgMatch ? imgMatch[1] : '';

    if (title) {
      idx++;
      products.push({
        id: `acs-prod-${idx}`,
        title,
        desc,
        specs,
        priceText,
        price,
        rawImg: imgSrc,
      });
    }
  }
}

// Also parse categories from id="categories" or class="categories"
const categoriesSectionMatch = html.match(/<section[^>]*id=["']categories["'][\s\S]*?<\/section>/i) || html.match(/<div[^>]*class=["'][^"']*categories[^"']*["'][\s\S]*?<\/section>/i);
const categories = [];

const catCardRegex = /<div class="category-card">([\s\S]*?)<\/div>/gi;
let cm;
while ((cm = catCardRegex.exec(html)) !== null) {
  const catHtml = cm[1];
  const cImg = catHtml.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1] || '';
  const cTitle = catHtml.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i)?.[1]?.replace(/<[^>]+>/g, '')?.trim() || 
                 catHtml.match(/<h4[^>]*>([\s\S]*?)<\/h4>/i)?.[1]?.replace(/<[^>]+>/g, '')?.trim() || '';
  const cDesc = catHtml.match(/<p[^>]*>([\s\S]*?)<\/p>/i)?.[1]?.replace(/<[^>]+>/g, '')?.trim() || '';
  if (cTitle) {
    categories.push({ title: cTitle, desc: cDesc, img: cImg });
  }
}

// Extract contact section
const contactSectionMatch = html.match(/<section[^>]*id=["']contact["'][\s\S]*?<\/section>/i);
let contactHtml = contactSectionMatch ? contactSectionMatch[0] : '';

fs.writeFileSync(path.resolve(__dirname, 'all-extracted-products.json'), JSON.stringify({
  products,
  categories,
  contactHtml
}, null, 2), 'utf8');

console.log(`Extracted ${products.length} products and ${categories.length} categories.`);

