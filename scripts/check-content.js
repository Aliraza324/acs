const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, 'acskenya-raw.html'), 'utf8');

const caseStudiesIdx = html.indexOf('Case Studies');
if (caseStudiesIdx !== -1) {
  console.log('Case studies text found:');
  console.log(html.slice(caseStudiesIdx, caseStudiesIdx + 1500));
}

const aboutIdx = html.indexOf('About ACS');
if (aboutIdx !== -1) {
  console.log('About ACS text found:');
  console.log(html.slice(aboutIdx, aboutIdx + 1500));
}

