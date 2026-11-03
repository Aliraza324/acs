const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, 'acskenya-raw.html'), 'utf8');

// Find all script tags containing product data
const scriptTags = Array.from(html.matchAll(/<script[\s\S]*?>([\s\S]*?)<\/script>/gi)).map(m => m[1]);
console.log(`Found ${scriptTags.length} script tags.`);

let foundProducts = null;
for (const s of scriptTags) {
  if (s.includes('name') && (s.includes('price') || s.includes('img') || s.includes('category'))) {
    console.log('Candidate script tag with products found! Length:', s.length);
    fs.writeFileSync(path.resolve(__dirname, 'extracted-script.js'), s, 'utf8');
    foundProducts = s;
  }
}

// Find products section in HTML
const prodIdx = html.indexOf('id="products"') !== -1 ? html.indexOf('id="products"') : html.indexOf("id='products'");
console.log('id="products" index:', prodIdx);
if (prodIdx !== -1) {
  fs.writeFileSync(path.resolve(__dirname, 'extracted-products-section.html'), html.slice(Math.max(0, prodIdx - 200), prodIdx + 4000), 'utf8');
}

// Find contact section in HTML
const contactIdx = html.indexOf('id="contact"') !== -1 ? html.indexOf('id="contact"') : html.indexOf("id='contact'");
console.log('id="contact" index:', contactIdx);
if (contactIdx !== -1) {
  fs.writeFileSync(path.resolve(__dirname, 'extracted-contact-section.html'), html.slice(Math.max(0, contactIdx - 200), contactIdx + 4000), 'utf8');
}

