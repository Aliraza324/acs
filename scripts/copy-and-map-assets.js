const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '..', 'public', 'images', 'downloaded');
const prodDir = path.resolve(__dirname, '..', 'public', 'images', 'products');
const catDir = path.resolve(__dirname, '..', 'public', 'images', 'categories');
const brandDir = path.resolve(__dirname, '..', 'public', 'images', 'brands');
const publicImagesDir = path.resolve(__dirname, '..', 'public', 'images');

[prodDir, catDir, brandDir].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

function copyIf(srcFile, destFile) {
  const s = path.join(srcDir, srcFile);
  if (fs.existsSync(s)) {
    fs.copyFileSync(s, destFile);
    console.log(`Copied ${srcFile} -> ${destFile}`);
    return true;
  }
  return false;
}

// Logo
copyIf('acs-asset-1.jpg', path.join(publicImagesDir, 'acsweblogo.jpg'));
copyIf('acs-asset-2.jpg', path.join(publicImagesDir, 'promo.jpg'));

// Categories
copyIf('acs-asset-4.jpg', path.join(catDir, 'servers.jpg'));
copyIf('acs-asset-5.jpg', path.join(catDir, 'laptops.jpg'));
copyIf('acs-asset-6.jpg', path.join(catDir, 'printers.jpg'));
copyIf('acs-asset-7.jpg', path.join(catDir, 'accessories.jpg'));
copyIf('acs-asset-8.jpg', path.join(catDir, 'repair.jpg'));

// Products
copyIf('acs-asset-9.jpeg', path.join(prodDir, 'dell-poweredge.jpeg'));
copyIf('acs-asset-10.jpeg', path.join(prodDir, 'hp-proliant.jpeg'));
copyIf('acs-asset-11.jpg', path.join(prodDir, 'tp-link-omada.jpg'));
copyIf('acs-asset-12.jpg', path.join(prodDir, 'hpe-proliant-ml110.jpg'));
copyIf('acs-asset-15.jpg', path.join(prodDir, 'hp-elitebook-840-g5.jpg'));
copyIf('acs-asset-16.jpg', path.join(prodDir, 'macbook-air-m2.jpg'));
copyIf('acs-asset-17.jpg', path.join(prodDir, 'hp-spectre.jpg'));
copyIf('acs-asset-18.jpg', path.join(prodDir, 'hp-laptop-core-i5.jpg'));
copyIf('acs-asset-19.jpg', path.join(prodDir, 'acer-aspire-5.jpg'));
copyIf('acs-asset-20.jpg', path.join(prodDir, 'epson-lq-350.jpg'));
copyIf('acs-asset-21.jpg', path.join(prodDir, 'hp-m283fdw.jpg'));
copyIf('acs-asset-22.jpg', path.join(prodDir, 'hp-m479fdn.jpg'));
copyIf('acs-asset-23.jpg', path.join(prodDir, 'epson-l5290.jpg'));
copyIf('acs-asset-24.jpg', path.join(prodDir, 'epson-lq-690.jpg'));
copyIf('acs-asset-25.jpg', path.join(prodDir, 'hp-305a-toner.jpg'));
copyIf('acs-asset-26.jpg', path.join(prodDir, 'evolis-hightrust-600.jpg'));
copyIf('acs-asset-27.jpg', path.join(prodDir, 'hp-78a-toner.jpg'));
copyIf('acs-asset-28.jpg', path.join(prodDir, 'hp-35a-toner.jpg'));
copyIf('acs-asset-29.jpg', path.join(prodDir, 'hp-49a-toner.jpg'));
copyIf('acs-asset-30.jpg', path.join(prodDir, 'epson-tm-20iii.jpg'));
copyIf('acs-asset-31.jpg', path.join(prodDir, 'hp-85a-toner.jpg'));
copyIf('acs-asset-32.jpg', path.join(prodDir, 'hp-80a-toner.jpg'));
copyIf('acs-asset-33.jpg', path.join(prodDir, 'hp-scanjet-2600f1.jpg'));
copyIf('acs-asset-34.jpg', path.join(prodDir, 'kyocera-ma3500cifx.jpg'));
copyIf('acs-asset-35.jpg', path.join(prodDir, 'epson-epiqvision-fh02.jpg'));

// Partner Logos
copyIf('acs-asset-36.jpg', path.join(brandDir, 'hp-logo.jpg'));
copyIf('acs-asset-37.jpg', path.join(brandDir, 'dell-logo.jpg'));
copyIf('acs-asset-38.png', path.join(brandDir, 'lenovo-logo.png'));

console.log('All downloaded assets cleanly mapped into public/images!');

