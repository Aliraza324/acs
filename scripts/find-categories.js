const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, 'acskenya-raw.html'), 'utf8');

// Find all occurrences of category or categories in html
const matches = [];
const regex = /<section[^>]*id=["']categories["'][\s\S]*?<\/section>/gi;
let m;
while ((m = regex.exec(html)) !== null) {
  matches.push(m[0]);
}

if (matches.length > 0) {
  console.log('Found category section!');
  fs.writeFileSync(path.resolve(__dirname, 'raw-category-section.html'), matches[0], 'utf8');
} else {
  console.log('No section id=categories. Searching for category links or menu items...');
  const catMenu = html.match(/<nav[\s\S]*?<\/nav>/i) || html.match(/class=["'][^"']*menu[^"']*["'][\s\S]*?<\/ul>/i);
  if (catMenu) {
    fs.writeFileSync(path.resolve(__dirname, 'raw-menu.html'), catMenu[0], 'utf8');
  }
}

