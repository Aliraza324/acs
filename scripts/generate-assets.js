const fs = require('fs');
const path = require('path');

const publicDir = path.resolve(__dirname, '..', 'public', 'images');

// Ensure all subdirectories exist
const dirs = ['hero', 'categories', 'products', 'technology', 'team', 'banners', 'backgrounds'];
dirs.forEach(d => {
  const full = path.join(publicDir, d);
  if (!fs.existsSync(full)) {
    fs.mkdirSync(full, { recursive: true });
  }
});

function createSvg(width, height, content) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">${content}</svg>`;
}

// 1. HP Server SVG
const hpServerSvg = createSvg(600, 400, `
  <defs>
    <linearGradient id="serverBody" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1E293B" />
      <stop offset="50%" stop-color="#0F172A" />
      <stop offset="100%" stop-color="#020617" />
    </linearGradient>
    <linearGradient id="bezel" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#334155" />
      <stop offset="50%" stop-color="#64748B" />
      <stop offset="100%" stop-color="#1E293B" />
    </linearGradient>
    <linearGradient id="driveBay" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#111827" />
      <stop offset="100%" stop-color="#1F2937" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
    </filter>
  </defs>

  <rect width="600" height="400" rx="20" fill="#F8FAFC" />
  
  <!-- Server Chassis Shadow -->
  <ellipse cx="300" cy="340" rx="250" ry="24" fill="#071B49" opacity="0.12" filter="blur(8px)" />

  <!-- 2U Server Chassis -->
  <g transform="translate(60, 110)">
    <!-- Rack Ears -->
    <rect x="-24" y="10" width="24" height="160" rx="3" fill="#475569" />
    <circle cx="-12" cy="35" r="4" fill="#0F172A" />
    <circle cx="-12" cy="145" r="4" fill="#0F172A" />
    
    <rect x="480" y="10" width="24" height="160" rx="3" fill="#475569" />
    <circle cx="492" cy="35" r="4" fill="#0F172A" />
    <circle cx="492" cy="145" r="4" fill="#0F172A" />

    <!-- Main Chassis Frame -->
    <rect x="0" y="0" width="480" height="180" rx="6" fill="url(#serverBody)" stroke="#475569" stroke-width="2" />
    <rect x="6" y="6" width="468" height="168" rx="4" fill="#0B132B" stroke="#334155" stroke-width="1" />

    <!-- Drive Caddy Grid (8 Bays) -->
    ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `
      <g transform="translate(${20 + i * 44}, 24)">
        <rect width="36" height="132" rx="3" fill="url(#driveBay)" stroke="#374151" stroke-width="1" />
        <rect x="4" y="6" width="28" height="12" rx="2" fill="#1F2937" />
        <circle cx="10" cy="12" r="2" fill="${i < 6 ? '#10B981' : '#F59E0B'}" filter="url(#glow)" />
        <rect x="6" y="24" width="24" height="96" rx="2" fill="#111827" stroke="#1F2937" stroke-width="0.5" />
        <line x1="10" y1="40" x2="26" y2="40" stroke="#374151" stroke-width="1.5" />
        <line x1="10" y1="55" x2="26" y2="55" stroke="#374151" stroke-width="1.5" />
        <line x1="10" y1="70" x2="26" y2="70" stroke="#374151" stroke-width="1.5" />
        <!-- Drive Release Latch -->
        <rect x="6" y="98" width="24" height="18" rx="2" fill="#4B5563" />
        <rect x="14" y="104" width="8" height="6" rx="1" fill="#DC2626" />
      </g>
    `).join('')}

    <!-- Right Control Panel & Optical/Port Area -->
    <rect x="380" y="24" width="85" height="132" rx="4" fill="#1E293B" stroke="#475569" stroke-width="1" />
    <!-- HPE / DL380 Branding -->
    <text x="390" y="44" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#38BDF8">HPE PROLIANT</text>
    <text x="390" y="58" font-family="system-ui, sans-serif" font-size="8" font-weight="600" fill="#94A3B8">DL380 Gen10</text>

    <!-- Power Button & Health LEDs -->
    <circle cx="400" cy="80" r="6" fill="#0866F5" filter="url(#glow)" />
    <circle cx="420" cy="80" r="4" fill="#10B981" filter="url(#glow)" />
    <circle cx="438" cy="80" r="4" fill="#10B981" filter="url(#glow)" />
    <circle cx="454" cy="80" r="4" fill="#10B981" filter="url(#glow)" />

    <!-- Front USB & iLO Diagnostic Port -->
    <rect x="394" y="104" width="20" height="8" rx="1" fill="#000" stroke="#64748B" stroke-width="1" />
    <rect x="424" y="104" width="26" height="12" rx="1" fill="#000" stroke="#64748B" stroke-width="1" />
    <text x="394" y="132" font-family="system-ui, sans-serif" font-size="7" fill="#64748B">iLO / UID ACTIVE</text>
  </g>
`);

// 2. Dell Server SVG
const dellServerSvg = createSvg(600, 400, `
  <defs>
    <linearGradient id="dellBezel" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0F172A" />
      <stop offset="50%" stop-color="#1E293B" />
      <stop offset="100%" stop-color="#0F172A" />
    </linearGradient>
    <filter id="dellGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
    </filter>
  </defs>

  <rect width="600" height="400" rx="20" fill="#F8FAFC" />
  <ellipse cx="300" cy="340" rx="250" ry="24" fill="#071B49" opacity="0.12" filter="blur(8px)" />

  <g transform="translate(60, 110)">
    <!-- Rack Ears -->
    <rect x="-24" y="10" width="24" height="160" rx="3" fill="#334155" />
    <rect x="480" y="10" width="24" height="160" rx="3" fill="#334155" />

    <!-- Honeycomb Bezel -->
    <rect x="0" y="0" width="480" height="180" rx="6" fill="url(#dellBezel)" stroke="#0866F5" stroke-width="2" />
    <rect x="8" y="8" width="464" height="164" rx="4" fill="#090D16" />

    <!-- Honeycomb Hexagon Matrix Accents -->
    <g fill="#1E293B" stroke="#0866F5" stroke-width="0.5" opacity="0.4">
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(col => `
        <circle cx="${30 + col * 38}" cy="50" r="12" />
        <circle cx="${30 + col * 38}" cy="90" r="12" />
        <circle cx="${30 + col * 38}" cy="130" r="12" />
      `).join('')}
    </g>

    <!-- Center Dell PowerEdge Badge -->
    <rect x="180" y="60" width="120" height="60" rx="6" fill="#0F172A" stroke="#0866F5" stroke-width="1.5" />
    <text x="240" y="86" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" font-weight="900" fill="#FFFFFF" letter-spacing="2">DELL EMC</text>
    <text x="240" y="104" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9" font-weight="700" fill="#38BDF8" letter-spacing="1">PowerEdge R750</text>

    <!-- Status Bar & Indicator Lights -->
    <circle cx="430" cy="50" r="5" fill="#0866F5" filter="url(#dellGlow)" />
    <circle cx="445" cy="50" r="4" fill="#10B981" filter="url(#dellGlow)" />
    <circle cx="430" cy="70" r="3" fill="#10B981" />
    <circle cx="445" cy="70" r="3" fill="#10B981" />
  </g>
`);

// 3. HP EliteBook Laptop SVG
const hpLaptopSvg = createSvg(600, 400, `
  <defs>
    <linearGradient id="laptopLid" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#E2E8F0" />
      <stop offset="50%" stop-color="#CBD5E1" />
      <stop offset="100%" stop-color="#94A3B8" />
    </linearGradient>
    <linearGradient id="screenGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#071B49" />
      <stop offset="50%" stop-color="#0866F5" />
      <stop offset="100%" stop-color="#00D2FF" />
    </linearGradient>
  </defs>

  <rect width="600" height="400" rx="20" fill="#F8FAFC" />
  <ellipse cx="300" cy="350" rx="220" ry="16" fill="#071B49" opacity="0.1" filter="blur(6px)" />

  <!-- Base / Keyboard Area -->
  <path d="M 90 320 L 510 320 L 470 336 L 130 336 Z" fill="#94A3B8" stroke="#64748B" stroke-width="1" />
  <rect x="250" y="322" width="100" height="10" rx="2" fill="#CBD5E1" />

  <!-- Screen Bezel -->
  <rect x="120" y="60" width="360" height="250" rx="10" fill="#0F172A" stroke="#CBD5E1" stroke-width="2" />
  
  <!-- Active 16:10 Vibrant Display -->
  <rect x="130" y="70" width="340" height="225" rx="4" fill="url(#screenGrad)" />
  
  <!-- Screen UI Mockup -->
  <rect x="150" y="90" width="300" height="30" rx="6" fill="#FFFFFF" opacity="0.15" />
  <circle cx="168" cy="105" r="5" fill="#38BDF8" />
  <rect x="185" y="101" width="120" height="8" rx="2" fill="#FFFFFF" />
  
  <rect x="150" y="130" width="140" height="145" rx="6" fill="#FFFFFF" opacity="0.12" />
  <rect x="300" y="130" width="150" height="68" rx="6" fill="#FFFFFF" opacity="0.12" />
  <rect x="300" y="206" width="150" height="69" rx="6" fill="#FFFFFF" opacity="0.12" />

  <!-- Top Webcam & Sensor Array -->
  <circle cx="300" cy="65" r="2.5" fill="#334155" />
  <circle cx="308" cy="65" r="1.5" fill="#10B981" />
  
  <!-- HP Minimal Slash Logo on Chin -->
  <text x="300" y="303" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9" font-weight="900" fill="#94A3B8">hp</text>
`);

// 4. Dell Latitude Laptop SVG
const dellLaptopSvg = createSvg(600, 400, `
  <defs>
    <linearGradient id="dellLid" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1E293B" />
      <stop offset="100%" stop-color="#0F172A" />
    </linearGradient>
    <linearGradient id="dellScreen" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#04102C" />
      <stop offset="40%" stop-color="#0866F5" />
      <stop offset="100%" stop-color="#1677FF" />
    </linearGradient>
  </defs>

  <rect width="600" height="400" rx="20" fill="#F8FAFC" />
  <ellipse cx="300" cy="350" rx="220" ry="16" fill="#071B49" opacity="0.1" filter="blur(6px)" />

  <path d="M 80 318 L 520 318 L 485 336 L 115 336 Z" fill="#334155" stroke="#1E293B" stroke-width="1" />
  <rect x="240" y="322" width="120" height="10" rx="2" fill="#475569" />

  <rect x="115" y="60" width="370" height="250" rx="10" fill="#0A0F1D" stroke="#475569" stroke-width="2" />
  <rect x="125" y="70" width="350" height="225" rx="4" fill="url(#dellScreen)" />

  <!-- Code / Dashboard Graphics on Display -->
  <text x="145" y="100" font-family="monospace" font-size="11" fill="#38BDF8" font-weight="bold">Dell Latitude 5520 Enterprise</text>
  <rect x="145" y="115" width="200" height="6" rx="2" fill="#94A3B8" opacity="0.7" />
  <rect x="145" y="128" width="160" height="6" rx="2" fill="#94A3B8" opacity="0.7" />
  <rect x="145" y="141" width="220" height="6" rx="2" fill="#94A3B8" opacity="0.7" />

  <rect x="145" y="170" width="150" height="105" rx="6" fill="#000000" opacity="0.3" />
  <rect x="310" y="170" width="145" height="105" rx="6" fill="#000000" opacity="0.3" />

  <text x="300" y="303" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9" font-weight="900" fill="#38BDF8" letter-spacing="1">DELL</text>
`);

// 5. HP LaserJet Printer SVG
const hpPrinterSvg = createSvg(600, 400, `
  <defs>
    <linearGradient id="printerBody" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="50%" stop-color="#F1F5F9" />
      <stop offset="100%" stop-color="#E2E8F0" />
    </linearGradient>
  </defs>

  <rect width="600" height="400" rx="20" fill="#F8FAFC" />
  <ellipse cx="300" cy="350" rx="180" ry="18" fill="#071B49" opacity="0.1" filter="blur(6px)" />

  <g transform="translate(140, 80)">
    <!-- Base Paper Tray 2 -->
    <rect x="20" y="180" width="280" height="60" rx="8" fill="#E2E8F0" stroke="#CBD5E1" stroke-width="2" />
    <rect x="50" y="200" width="220" height="16" rx="3" fill="#94A3B8" />
    <text x="160" y="212" text-anchor="middle" font-family="system-ui, sans-serif" font-size="8" fill="#FFFFFF" font-weight="bold">TRAY 2 • 250 SHEETS</text>

    <!-- Main Printer Body -->
    <rect x="0" y="60" width="320" height="130" rx="12" fill="url(#printerBody)" stroke="#CBD5E1" stroke-width="2" />
    
    <!-- Output Bin Recess -->
    <path d="M 40 60 L 280 60 L 260 120 L 60 120 Z" fill="#0F172A" />
    
    <!-- Top Cover & Display -->
    <rect x="0" y="20" width="320" height="46" rx="6" fill="#334155" />
    
    <!-- LCD Graphic Display Screen -->
    <rect x="220" y="28" width="80" height="30" rx="3" fill="#0284C7" stroke="#38BDF8" stroke-width="1" />
    <text x="230" y="42" font-family="monospace" font-size="8" fill="#FFFFFF" font-weight="bold">READY</text>
    <text x="230" y="52" font-family="monospace" font-size="7" fill="#E0F2FE">100% TONER</text>

    <!-- HP Logo -->
    <circle cx="45" cy="42" r="14" fill="#0866F5" />
    <text x="45" y="47" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="900" fill="#FFFFFF">hp</text>

    <text x="160" y="160" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#475569">LaserJet Pro M404dn</text>
  </g>
`);

// 6. TP-Link Switch SVG
const switchSvg = createSvg(600, 400, `
  <defs>
    <filter id="swGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
    </filter>
  </defs>

  <rect width="600" height="400" rx="20" fill="#F8FAFC" />
  <ellipse cx="300" cy="310" rx="240" ry="16" fill="#071B49" opacity="0.12" filter="blur(6px)" />

  <g transform="translate(60, 160)">
    <!-- 1U Steel Enclosure -->
    <rect x="0" y="0" width="480" height="90" rx="4" fill="#1E293B" stroke="#475569" stroke-width="2" />
    <!-- Rack Ears -->
    <rect x="-20" y="10" width="20" height="70" rx="2" fill="#334155" />
    <rect x="480" y="10" width="20" height="70" rx="2" fill="#334155" />

    <!-- Left Brand & Status -->
    <text x="20" y="32" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#38BDF8">tp-link</text>
    <text x="20" y="48" font-family="system-ui, sans-serif" font-size="8" fill="#94A3B8">TL-SG1024D • 24G</text>
    <circle cx="24" cy="68" r="3" fill="#10B981" filter="url(#swGlow)" />
    <text x="34" y="71" font-family="system-ui, sans-serif" font-size="7" fill="#10B981">PWR</text>

    <!-- 24 Gigabit Ethernet RJ45 Ports (2 rows of 12) -->
    <g transform="translate(130, 20)">
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(col => `
        <!-- Top Port -->
        <rect x="${col * 28}" y="0" width="22" height="24" rx="2" fill="#0B132B" stroke="#475569" stroke-width="1" />
        <circle cx="${col * 28 + 11}" cy="-4" r="2" fill="${col < 10 ? '#10B981' : '#64748B'}" />
        <!-- Bottom Port -->
        <rect x="${col * 28}" y="28" width="22" height="24" rx="2" fill="#0B132B" stroke="#475569" stroke-width="1" />
        <circle cx="${col * 28 + 11}" cy="56" r="2" fill="${col < 9 ? '#10B981' : '#64748B'}" />
      `).join('')}
    </g>
  </g>
`);

// 7. Dell Monitor SVG
const monitorSvg = createSvg(600, 400, `
  <defs>
    <linearGradient id="monScreen" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0284C7" />
      <stop offset="50%" stop-color="#0866F5" />
      <stop offset="100%" stop-color="#071B49" />
    </linearGradient>
  </defs>

  <rect width="600" height="400" rx="20" fill="#F8FAFC" />
  <ellipse cx="300" cy="370" rx="140" ry="12" fill="#071B49" opacity="0.1" filter="blur(6px)" />

  <!-- Stand Base -->
  <rect x="220" y="350" width="160" height="18" rx="6" fill="#94A3B8" stroke="#64748B" stroke-width="1" />
  <!-- Vertical Riser -->
  <rect x="285" y="240" width="30" height="115" rx="3" fill="#CBD5E1" stroke="#94A3B8" stroke-width="1" />

  <!-- Display Panel (27" InfinityEdge) -->
  <rect x="80" y="40" width="440" height="250" rx="8" fill="#0F172A" stroke="#CBD5E1" stroke-width="2" />
  <rect x="86" y="46" width="428" height="238" rx="4" fill="url(#monScreen)" />

  <!-- Color-Calibrated Vivid Wallpaper Presentation -->
  <circle cx="300" cy="165" r="70" fill="#38BDF8" opacity="0.3" filter="blur(16px)" />
  <circle cx="240" cy="140" r="50" fill="#00D2FF" opacity="0.4" filter="blur(12px)" />

  <text x="300" y="160" text-anchor="middle" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#FFFFFF">Dell UltraSharp 27" QHD</text>
  <text x="300" y="180" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#E0F2FE">99% sRGB • IPS ComfortView Plus</text>

  <!-- Dell Logo on Chin -->
  <text x="300" y="278" text-anchor="middle" font-family="system-ui, sans-serif" font-size="8" font-weight="900" fill="#94A3B8" letter-spacing="1">DELL</text>
`);

// 8. WD Red NAS Hard Drive SVG
const hddSvg = createSvg(600, 400, `
  <defs>
    <linearGradient id="driveCasing" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#E2E8F0" />
      <stop offset="50%" stop-color="#CBD5E1" />
      <stop offset="100%" stop-color="#94A3B8" />
    </linearGradient>
  </defs>

  <rect width="600" height="400" rx="20" fill="#F8FAFC" />
  <ellipse cx="300" cy="350" rx="160" ry="16" fill="#071B49" opacity="0.12" filter="blur(6px)" />

  <!-- 3.5" HDD Form Factor -->
  <g transform="translate(180, 50)">
    <!-- Main Metal Enclosure -->
    <rect x="0" y="0" width="240" height="300" rx="12" fill="url(#driveCasing)" stroke="#64748B" stroke-width="2" />
    
    <!-- Top Recessed Area -->
    <rect x="15" y="15" width="210" height="270" rx="8" fill="#F1F5F9" stroke="#94A3B8" stroke-width="1" />

    <!-- Red NAS Label -->
    <rect x="25" y="25" width="190" height="75" rx="4" fill="#DC2626" />
    <text x="35" y="52" font-family="system-ui, sans-serif" font-size="16" font-weight="900" fill="#FFFFFF">Western Digital</text>
    <text x="35" y="74" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#FEE2E2">WD Red Plus</text>
    <text x="180" y="74" font-family="system-ui, sans-serif" font-size="18" font-weight="900" fill="#FFFFFF">2TB</text>
    <text x="35" y="90" font-family="system-ui, sans-serif" font-size="8" fill="#FEE2E2">NASware 3.0 • CMR 24/7 Reliability</text>

    <!-- Barcode & Spec Lines -->
    <rect x="25" y="110" width="190" height="15" rx="1" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="0.5" />
    <g fill="#000000">
      ${[0, 2, 5, 8, 12, 15, 17, 22, 25, 29, 34, 38, 42, 47, 50].map(x => `
        <rect x="${30 + x * 3}" y="112" width="2" height="11" />
      `).join('')}
    </g>

    <!-- Spindle Motor Center Hub Circle -->
    <circle cx="120" cy="200" r="38" fill="#CBD5E1" stroke="#64748B" stroke-width="2" />
    <circle cx="120" cy="200" r="16" fill="#94A3B8" />
    <circle cx="120" cy="200" r="6" fill="#475569" />
  </g>
`);

// Write all Product SVGs
fs.writeFileSync(path.join(publicDir, 'prod-hp-server.png'), hpServerSvg);
fs.writeFileSync(path.join(publicDir, 'prod-dell-server.png'), dellServerSvg);
fs.writeFileSync(path.join(publicDir, 'prod-hp-elitebook.png'), hpLaptopSvg);
fs.writeFileSync(path.join(publicDir, 'prod-dell-latitude.png'), dellLaptopSvg);
fs.writeFileSync(path.join(publicDir, 'prod-hp-printer.png'), hpPrinterSvg);
fs.writeFileSync(path.join(publicDir, 'prod-tplink-switch.png'), switchSvg);
fs.writeFileSync(path.join(publicDir, 'prod-dell-monitor.png'), monitorSvg);
fs.writeFileSync(path.join(publicDir, 'prod-wd-harddrive.png'), hddSvg);

// Also copy or write to public/images/categories/
fs.writeFileSync(path.join(publicDir, 'cat-servers.png'), hpServerSvg);
fs.writeFileSync(path.join(publicDir, 'cat-laptops.png'), hpLaptopSvg);
fs.writeFileSync(path.join(publicDir, 'cat-printers.png'), hpPrinterSvg);
fs.writeFileSync(path.join(publicDir, 'cat-accessories.png'), dellLaptopSvg);
fs.writeFileSync(path.join(publicDir, 'cat-networking.png'), switchSvg);
fs.writeFileSync(path.join(publicDir, 'cat-storage.png'), hddSvg);
fs.writeFileSync(path.join(publicDir, 'cat-desktops.png'), monitorSvg);
fs.writeFileSync(path.join(publicDir, 'cat-software.png'), dellServerSvg);

// Also Hero Showcase & Others
fs.writeFileSync(path.join(publicDir, 'hero-tech-showcase.png'), hpServerSvg);
fs.writeFileSync(path.join(publicDir, 'why-choose-specialist.png'), hpLaptopSvg);
fs.writeFileSync(path.join(publicDir, 'newsletter-laptop.png'), dellLaptopSvg);
fs.writeFileSync(path.join(publicDir, 'corporate-building.png'), monitorSvg);
fs.writeFileSync(path.join(publicDir, 'testimonial-avatar-1.png'), hpLaptopSvg);

console.log('Successfully generated all local fallback assets in public/images!');

