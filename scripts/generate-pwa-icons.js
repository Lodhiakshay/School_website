const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function generateIcons() {
  const logoPath = path.join(__dirname, '../public/logo.png');
  const publicDir = path.join(__dirname, '../public');

  if (!fs.existsSync(logoPath)) {
    console.error('logo.png not found in public directory');
    process.exit(1);
  }

  // 1. Generate 192x192 icon with clean white background and 10% padding
  const logo192 = await sharp(logoPath)
    .resize(160, 160, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .toBuffer();

  await sharp({
    create: {
      width: 192,
      height: 192,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite([{ input: logo192, gravity: 'center' }])
    .png()
    .toFile(path.join(publicDir, 'icon-192.png'));
  console.log('✓ Generated icon-192.png');

  // 2. Generate 512x512 standard icon
  const logo512 = await sharp(logoPath)
    .resize(440, 440, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .toBuffer();

  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite([{ input: logo512, gravity: 'center' }])
    .png()
    .toFile(path.join(publicDir, 'icon-512.png'));
  console.log('✓ Generated icon-512.png');

  // 3. Generate 512x512 MASKABLE icon (safe zone: 65-70% size with #002060 navy background)
  // Maskable icons get cropped by Android circle/squircle masks, so the crest needs to be in the center 350x350 box
  const logoMaskable = await sharp(logoPath)
    .resize(360, 360, { fit: 'contain', background: { r: 0, g: 32, b: 96, alpha: 0 } })
    .toBuffer();

  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 0, g: 32, b: 96, alpha: 1 }, // #002060 Royal Navy
    },
  })
    .composite([{ input: logoMaskable, gravity: 'center' }])
    .png()
    .toFile(path.join(publicDir, 'icon-maskable.png'));
  console.log('✓ Generated icon-maskable.png');

  // 4. Generate apple-touch-icon 180x180
  const logoApple = await sharp(logoPath)
    .resize(150, 150, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .toBuffer();

  await sharp({
    create: {
      width: 180,
      height: 180,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite([{ input: logoApple, gravity: 'center' }])
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('✓ Generated apple-touch-icon.png');
}

generateIcons().catch(console.error);
