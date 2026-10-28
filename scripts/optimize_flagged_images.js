import sharp from 'sharp';
import fs from 'node:fs';

async function optimizeImages() {
  // 1. Header & Footer Logo
  const logoPath = 'public/grm-logos/GRM-icon-logo-white.webp';
  const logoBackup = 'public/grm-logos/GRM-icon-logo-white.orig.webp';
  if (!fs.existsSync(logoBackup)) {
    fs.copyFileSync(logoPath, logoBackup);
  }
  const logoBuf = await sharp(logoBackup)
    .resize(80, 58, { fit: 'inside' })
    .webp({ quality: 85, effort: 6 })
    .toBuffer();
  fs.writeFileSync(logoPath, logoBuf);
  console.log(`Optimized ${logoPath}: ${(logoBuf.length / 1024).toFixed(2)} KiB`);

  // 2. Services card monitor graphic
  const monPath = 'public/grm-main-graphics/monitor-with-image-file.webp';
  const monBackup = 'public/grm-main-graphics/monitor-with-image-file.orig.webp';
  if (!fs.existsSync(monBackup)) {
    fs.copyFileSync(monPath, monBackup);
  }
  const monBuf = await sharp(monBackup)
    .resize(346, 282, { fit: 'inside' })
    .webp({ quality: 80, effort: 6 })
    .toBuffer();
  fs.writeFileSync(monPath, monBuf);
  console.log(`Optimized ${monPath}: ${(monBuf.length / 1024).toFixed(2)} KiB`);
}

optimizeImages().catch(console.error);
