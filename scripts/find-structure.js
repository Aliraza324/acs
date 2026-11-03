const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, 'acskenya-raw.html'), 'utf8');

// Look for all links <a href=...>
const links = Array.from(html.matchAll(/<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)).map(m => ({
  href: m[1],
  text: m[2].replace(/<[^>]+>/g, '').trim()
}));

fs.writeFileSync(path.resolve(__dirname, 'all-links.json'), JSON.stringify(links.filter(l => l.text.length > 0), null, 2), 'utf8');

// Also look for all headings in the page
const headings = Array.from(html.matchAll(/<(h[1-4])[^>]*>([\s\S]*?)<\/\1>/gi)).map(m => ({
  tag: m[1],
  text: m[2].replace(/<[^>]+>/g, '').trim()
}));

fs.writeFileSync(path.resolve(__dirname, 'all-headings.json'), JSON.stringify(headings, null, 2), 'utf8');
console.log('Saved links and headings!');

