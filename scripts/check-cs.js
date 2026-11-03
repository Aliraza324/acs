const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, 'acskenya-raw.html'), 'utf8');

const csIdx = html.indexOf('Case Studies & Success Stories');
if (csIdx !== -1) {
  console.log(html.slice(csIdx, csIdx + 2000));
}

