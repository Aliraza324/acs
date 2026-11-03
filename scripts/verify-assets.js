const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const catalogFile = path.join(__dirname, '..', 'data', 'catalog.ts');
const catalogContent = fs.readFileSync(catalogFile, 'utf8');

// Extract all /images/... strings
const matches = [...catalogContent.matchAll(/['"](\/images\/[^'"]+)['"]/g)].map(m => m[1]);
const uniquePaths = [...new Set(matches)];

console.log(`Found ${uniquePaths.length} unique image paths in catalog.ts:`);
let missing = 0;
for (const imgPath of uniquePaths) {
  const localFile = path.join(publicDir, imgPath.replace(/^\//, ''));
  if (fs.existsSync(localFile)) {
    console.log(`✓ OK: ${imgPath}`);
  } else {
    console.error(`✗ MISSING: ${imgPath} (looked at ${localFile})`);
    missing++;
  }
}

if (missing === 0) {
  console.log('\nAll catalog image paths exist on disk!');
} else {
  console.error(`\nFound ${missing} missing images!`);
  process.exit(1);
}

