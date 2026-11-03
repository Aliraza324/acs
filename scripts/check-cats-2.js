const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, 'acskenya-raw.html'), 'utf8');

const catIdx = html.indexOf('QUICK CATEGORIES');
if (catIdx !== -1) {
  console.log(html.slice(catIdx + 1500, catIdx + 4000));
}

