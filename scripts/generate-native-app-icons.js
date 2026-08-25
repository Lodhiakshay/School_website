const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generateNativeAppIcons() {
  const logoPath = path.join(__dirname, '..', 'public', 'logo.png');
  const publicDir = path.join(__dirname, '..', 'public');

  if (!fs.existsSync(logoPath)) {
    console.error('logo.png not found at:', logoPath);
    return;
  }

  // 1. Prepare clean circular emblem from logo.png (circular crop with gold border)
  const logoBuffer = await sharp(logoPath)
    .resize(1024, 1024, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .toBuffer();

  // Create circular SVG mask for the emblem
  const circleMaskSvg = `
  <svg width="1024" height="1024" viewBox="0 0 1024 1024">
    <circle cx="512" cy="512" r="500" fill="#ffffff" />
  </svg>
  `;

  const circularLogo = await sharp(logoBuffer)
    .composite([{ input: Buffer.from(circleMaskSvg), blend: 'dest-in' }])
    .png()
    .toBuffer();

  // 2. Generate MASKABLE ICON (512x512) - For Android Adaptive App Launcher
  // Background: Solid #002060
  // Emblem in Safe Zone: 360x360 px centered at (256, 256)
  const emblem360 = await sharp(circularLogo)
    .resize(360, 360)
    .png()
    .toBuffer();

  // Gold ring border around the 360px emblem
  const maskableSvgBg = `
  <svg width="512" height="512" viewBox="0 0 512 512">
    <!-- Solid Navy Canvas -->
    <rect width="512" height="512" fill="#002060" />
    
    <!-- Subtle Royal Gradient Glow in Safe Zone -->
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#023e8a" stop-opacity="0.6" />
      <stop offset="100%" stop-color="#001845" stop-opacity="0" />
    </radialGradient>
    <circle cx="256" cy="256" r="210" fill="url(#glow)" />

    <!-- Gold Accent Ring -->
    <circle cx="256" cy="256" r="183" fill="none" stroke="#f59e0b" stroke-width="5" />
    <circle cx="256" cy="256" r="180" fill="#ffffff" />
  </svg>
  `;

  const maskableIcon = await sharp(Buffer.from(maskableSvgBg))
    .composite([{ input: emblem360, top: 76, left: 76 }])
    .png()
    .toBuffer();

  await sharp(maskableIcon).toFile(path.join(publicDir, 'icon-maskable.png'));
  console.log('✓ Generated icon-maskable.png (512x512, Android Adaptive Icon compliant)');

  // 3. Generate 512x512 APP ICON & SPLASH SCREEN ICON
  // Transparent canvas with circular gold framed emblem (440x440 px)
  const emblem440 = await sharp(circularLogo)
    .resize(440, 440)
    .png()
    .toBuffer();

  const icon512Svg = `
  <svg width="512" height="512" viewBox="0 0 512 512">
    <defs>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.35" />
      </filter>
    </defs>
    <!-- Circular White Base with Gold Border & Shadow -->
    <circle cx="256" cy="256" r="226" fill="#ffffff" filter="url(#shadow)" stroke="#f59e0b" stroke-width="6" />
  </svg>
  `;

  const icon512 = await sharp(Buffer.from(icon512Svg))
    .composite([{ input: emblem440, top: 36, left: 36 }])
    .png()
    .toBuffer();

  await sharp(icon512).toFile(path.join(publicDir, 'icon-512.png'));
  console.log('✓ Generated icon-512.png (512x512, High-Resolution PWA Icon)');

  // 4. Generate 192x192 ICON (Standard Mobile Icon)
  const icon192 = await sharp(icon512)
    .resize(192, 192)
    .png()
    .toBuffer();

  await sharp(icon192).toFile(path.join(publicDir, 'icon-192.png'));
  console.log('✓ Generated icon-192.png (192x192, Standard Mobile Icon)');

  // 5. Generate APPLE-TOUCH-ICON (180x180) - Solid Navy Background for iOS
  const emblem140 = await sharp(circularLogo)
    .resize(140, 140)
    .png()
    .toBuffer();

  const appleSvg = `
  <svg width="180" height="180" viewBox="0 0 180 180">
    <rect width="180" height="180" fill="#002060" rx="36" />
    <circle cx="90" cy="90" r="72" fill="#ffffff" stroke="#f59e0b" stroke-width="3" />
  </svg>
  `;

  const appleTouchIcon = await sharp(Buffer.from(appleSvg))
    .composite([{ input: emblem140, top: 20, left: 20 }])
    .png()
    .toBuffer();

  await sharp(appleTouchIcon).toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('✓ Generated apple-touch-icon.png (180x180, iOS Native Icon)');

  // 6. Generate Favicon (48x48)
  const favicon = await sharp(icon512)
    .resize(48, 48)
    .png()
    .toBuffer();

  await sharp(favicon).toFile(path.join(publicDir, 'favicon.png'));
  console.log('✓ Generated favicon.png');
}

generateNativeAppIcons().catch(console.error);

