/**
 * compress-images.js
 * Compresses all JPG / PNG images in src/images that are larger than SIZE_THRESHOLD_KB.
 * Saves compressed files back in-place.
 * Run with: node scripts/compress-images.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGE_DIR = path.join(__dirname, '..', 'src', 'images');
const SIZE_THRESHOLD_KB = 150; // skip files already below this
const MAX_WIDTH = 1920;         // never upscale, only downscale wide images
const JPG_QUALITY = 78;
const PNG_QUALITY = 80;

function walkDir(dir, exts) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(walkDir(full, exts));
    } else if (exts.includes(path.extname(entry.name).toLowerCase())) {
      results.push(full);
    }
  }
  return results;
}

async function compressImage(filePath) {
  const statBefore = fs.statSync(filePath);
  const sizeBefore = statBefore.size;
  if (sizeBefore < SIZE_THRESHOLD_KB * 1024) return;

  const ext = path.extname(filePath).toLowerCase();
  const tmpPath = filePath + '.tmp';

  try {
    const img = sharp(filePath).rotate(); // rotate() auto-fixes EXIF orientation
    const meta = await img.metadata();

    // Resize only if wider than MAX_WIDTH
    if (meta.width > MAX_WIDTH) {
      img.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    }

    if (ext === '.jpg' || ext === '.jpeg') {
      await img.jpeg({ quality: JPG_QUALITY, mozjpeg: true }).toFile(tmpPath);
    } else if (ext === '.png') {
      await img
        .png({ quality: PNG_QUALITY, compressionLevel: 9, palette: true })
        .toFile(tmpPath);
    } else {
      return;
    }

    const sizeAfter = fs.statSync(tmpPath).size;
    if (sizeAfter < sizeBefore) {
      fs.renameSync(tmpPath, filePath);
      const saved = ((sizeBefore - sizeAfter) / 1024).toFixed(0);
      console.log(
        `✓  ${path.relative(IMAGE_DIR, filePath).padEnd(55)} ${(sizeBefore / 1024).toFixed(0).padStart(7)} KB → ${(sizeAfter / 1024).toFixed(0).padStart(7)} KB  (saved ${saved} KB)`
      );
    } else {
      fs.unlinkSync(tmpPath);
      console.log(`–  ${path.relative(IMAGE_DIR, filePath)} already optimal`);
    }
  } catch (err) {
    if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
    console.error(`✗  ${filePath}: ${err.message}`);
  }
}

(async () => {
  const files = walkDir(IMAGE_DIR, ['.jpg', '.jpeg', '.png']);
  console.log(`Found ${files.length} images. Compressing…\n`);
  for (const f of files) {
    await compressImage(f);
  }
  console.log('\nDone.');
})();
