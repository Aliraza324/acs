const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const targetUrl = 'https://www.acskenya.com/';
const outputDir = path.resolve(__dirname, '..', 'public', 'images', 'downloaded');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function fetchUrl(urlStr) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlStr);
    const client = url.protocol === 'https:' ? https : http;
    const req = client.get(urlStr, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const redirectUrl = new URL(res.headers.location, urlStr).href;
        return resolve(fetchUrl(redirectUrl));
      }
      let data = [];
      res.on('data', chunk => data.push(chunk));
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: Buffer.concat(data)
        });
      });
    });
    req.on('error', reject);
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

function downloadImage(imgUrl, savePath) {
  return new Promise((resolve, reject) => {
    try {
      const url = new URL(imgUrl);
      const client = url.protocol === 'https:' ? https : http;
      client.get(imgUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Referer': targetUrl
        }
      }, (res) => {
        if (res.statusCode === 200) {
          const fileStream = fs.createWriteStream(savePath);
          res.pipe(fileStream);
          fileStream.on('finish', () => {
            fileStream.close();
            resolve(savePath);
          });
        } else {
          resolve(null);
        }
      }).on('error', (e) => {
        console.error('Download error for', imgUrl, e.message);
        resolve(null);
      });
    } catch (err) {
      resolve(null);
    }
  });
}

async function main() {
  console.log(`[ACS Scraper] Fetching ${targetUrl}...`);
  const response = await fetchUrl(targetUrl);
  const html = response.body.toString('utf8');
  console.log(`[ACS Scraper] Retrieved HTML (${html.length} bytes)`);

  fs.writeFileSync(path.resolve(__dirname, 'acskenya-raw.html'), html, 'utf8');

  // Extract all images
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let match;
  const images = new Set();
  while ((match = imgRegex.exec(html)) !== null) {
    const src = match[1];
    if (src && !src.startsWith('data:')) {
      try {
        const fullUrl = new URL(src, targetUrl).href;
        images.add(fullUrl);
      } catch (e) {
        // ignore
      }
    }
  }

  // Also check background images or srcset
  const bgRegex = /url\(["']?([^"')]+)["']?\)/gi;
  while ((match = bgRegex.exec(html)) !== null) {
    const src = match[1];
    if (src && !src.startsWith('data:') && (src.includes('.png') || src.includes('.jpg') || src.includes('.jpeg') || src.includes('.webp') || src.includes('.svg'))) {
      try {
        const fullUrl = new URL(src, targetUrl).href;
        images.add(fullUrl);
      } catch (e) {
        // ignore
      }
    }
  }

  console.log(`[ACS Scraper] Found ${images.size} unique image assets.`);

  const downloadedImages = [];
  let index = 1;
  for (const imgUrl of images) {
    try {
      const ext = path.extname(new URL(imgUrl).pathname) || '.png';
      const filename = `acs-asset-${index}${ext.split('?')[0]}`;
      const savePath = path.join(outputDir, filename);
      console.log(`Downloading (${index}/${images.size}): ${imgUrl} -> ${filename}`);
      const saved = await downloadImage(imgUrl, savePath);
      if (saved) {
        downloadedImages.push({
          url: imgUrl,
          localPath: `/images/downloaded/${filename}`,
          filename
        });
      }
      index++;
    } catch (e) {
      console.error('Error downloading:', imgUrl, e.message);
    }
  }

  // Extract all text sections, products, categories, contact info
  const result = {
    totalImages: images.size,
    downloadedImages,
    titleMatch: html.match(/<title>([^<]+)<\/title>/i)?.[1] || '',
    metaDesc: html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)?.[1] || '',
    h1s: Array.from(html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)).map(m => m[1].replace(/<[^>]+>/g, '').trim()),
    h2s: Array.from(html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)).map(m => m[1].replace(/<[^>]+>/g, '').trim()),
    h3s: Array.from(html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)).map(m => m[1].replace(/<[^>]+>/g, '').trim()),
    h4s: Array.from(html.matchAll(/<h4[^>]*>([\s\S]*?)<\/h4>/gi)).map(m => m[1].replace(/<[^>]+>/g, '').trim()),
    phoneMatches: Array.from(new Set((html.match(/(\+?254[\s\d-]{8,15}|07[\d\s-]{8,12})/g) || []))),
    emailMatches: Array.from(new Set((html.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || []))),
  };

  fs.writeFileSync(path.resolve(__dirname, 'acskenya-data.json'), JSON.stringify(result, null, 2), 'utf8');
  console.log('[ACS Scraper] Successfully extracted and saved all data and images!');
}

main().catch(err => {
  console.error('[ACS Scraper] Fatal error:', err);
  process.exit(1);
});

