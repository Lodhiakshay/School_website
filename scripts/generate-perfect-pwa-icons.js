const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generatePwaIcons() {
  const publicDir = path.join(__dirname, '..', 'public');
  const sourceLogo = path.join(publicDir, 'logo.png');

  console.log('Generating perfect PWA icons from:', sourceLogo);

  // 1. Prepare clean circular badge
  // Create an SVG circular frame with Royal Navy background and Gold border
  const size512 = 512;
  const badgeRadius = 220; // within 256 radius safe area

  // First, extract the core logo and ensure it is formatted as a circle
  const rawLogo = await sharp(sourceLogo).toBuffer();
  
  // Make a circular mask SVG
  const circleMask = Buffer.from(
    `<svg width="512" height="512">
      <circle cx="256" cy="256" r="230" fill="#fff" />
    </svg>`
  );

  // Create standard 512x512 transparent icon with circular badge
  const circularEmblem = await sharp(rawLogo)
    .resize(460, 460, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .composite([
      {
        input: Buffer.from(
          `<svg width="460" height="460">
            <circle cx="230" cy="230" r="225" fill="#002060" stroke="#f59e0b" stroke-width="8" />
          </svg>`
        ),
        blend: 'dest-over',
      }
    ])
    .toBuffer();

  // 1. icon-512.png (Transparent background, circular badge in center)
  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      {
        input: await sharp(circularEmblem).resize(460, 460).toBuffer(),
        top: 26,
        left: 26,
      },
    ])
    .png()
    .toFile(path.join(publicDir, 'icon-512.png'));

  console.log('✓ Created public/icon-512.png (Transparent with gold-bordered circular emblem)');

  // 2. icon-192.png (Transparent background, circular badge in center)
  await sharp({
    create: {
      width: 192,
      height: 192,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      {
        input: await sharp(circularEmblem).resize(172, 172).toBuffer(),
        top: 10,
        left: 10,
      },
    ])
    .png()
    .toFile(path.join(publicDir, 'icon-192.png'));

  console.log('✓ Created public/icon-192.png (Transparent 192x192)');

  // 3. icon-maskable.png (Full #002060 background, logo safely within 80% inner zone: 380px)
  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 0, g: 32, b: 96, alpha: 1 }, // #002060
    },
  })
    .composite([
      {
        input: await sharp(circularEmblem).resize(390, 390).toBuffer(),
        top: 61,
        left: 61,
      },
    ])
    .png()
    .toFile(path.join(publicDir, 'icon-maskable.png'));

  console.log('✓ Created public/icon-maskable.png (Full #002060 background with safe-zone logo)');

  // 4. apple-touch-icon.png (Solid #002060 background for iOS)
  await sharp({
    create: {
      width: 180,
      height: 180,
      channels: 4,
      background: { r: 0, g: 32, b: 96, alpha: 1 },
    },
  })
    .composite([
      {
        input: await sharp(circularEmblem).resize(144, 144).toBuffer(),
        top: 18,
        left: 18,
      },
    ])
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));

  console.log('✓ Created public/apple-touch-icon.png (180x180 for iOS)');

  console.log('All PWA icons generated successfully without white corner artifacts!');
}

generatePwaIcons().catch((err) => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
