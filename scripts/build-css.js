const { compile } = require('@tailwindcss/node');
const fs = require('fs');
const path = require('path');

function getFiles(dir, exts = ['.tsx', '.ts', '.jsx', '.js', '.html']) {
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    for (const file of list) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat && stat.isDirectory()) {
        if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
          results = results.concat(getFiles(fullPath, exts));
        }
      } else {
        if (exts.includes(path.extname(file))) {
          results.push(fullPath);
        }
      }
    }
  } catch {
    // ignore
  }
  return results;
}

async function buildCSS() {
  const rootDir = path.resolve(__dirname, '..');
  const files = getFiles(rootDir);

  const candidates = new Set();
  const tokenRegex = /[a-zA-Z0-9_\-\/\[\]\#\:\.\%\!]+/g;

  for (const file of files) {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const matches = content.match(tokenRegex) || [];
      for (const m of matches) {
        candidates.add(m);
      }
    } catch {
      // ignore
    }
  }

  const globalsCssPath = path.join(rootDir, 'app', 'globals.css');
  const css = fs.readFileSync(globalsCssPath, 'utf8');

  const compiler = await compile(css, {
    base: rootDir,
    onDependency: () => {}
  });

  const output = compiler.build(Array.from(candidates));
  const outPath = path.join(rootDir, 'app', 'tailwind-built.css');
  fs.writeFileSync(outPath, output, 'utf8');
  console.log(`[Tailwind] Compiled ${candidates.size} utility candidates -> ${outPath} (${output.length} bytes)`);
}

async function main() {
  await buildCSS();

  if (process.argv.includes('--watch')) {
    console.log('[Tailwind] Watching for changes in components & app...');
    const rootDir = path.resolve(__dirname, '..');
    const watchDirs = [
      path.join(rootDir, 'app'),
      path.join(rootDir, 'components'),
      path.join(rootDir, 'data'),
    ];

    let debounceTimer;
    for (const dir of watchDirs) {
      if (fs.existsSync(dir)) {
        fs.watch(dir, { recursive: true }, (eventType, filename) => {
          if (filename && filename.endsWith('tailwind-built.css')) return;
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(async () => {
            console.log(`[Tailwind] Change detected in ${filename}, rebuilding...`);
            await buildCSS();
          }, 150);
        });
      }
    }
  }
}

main().catch(err => {
  console.error('[Tailwind] Build error:', err);
  process.exit(1);
});
