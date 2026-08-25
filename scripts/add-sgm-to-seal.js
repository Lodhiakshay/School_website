const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function addSgmToSeal() {
  const sourcePath = 'C:/Users/akshay kumar/.gemini/antigravity/brain/4534c4ab-9983-474c-bd77-50136a81ee91/.user_uploaded/media_1787644898277.png';
  const outputDir = path.join(__dirname, '..', 'public', 'images', 'stamps');
  
  const metadata = await sharp(sourcePath).metadata();
  const width = metadata.width || 250;
  const height = metadata.height || 235;

  // Render SGM text in SVG matching the exact blue rubber ink stamp color & style
  const textSvg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <filter id="inkRoughness">
        <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="3" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
    <g filter="url(#inkRoughness)" opacity="0.95">
      <!-- S.G.M. in the center -->
      <text x="${width / 2}" y="${height / 2 + 8}" 
            font-family="'Arial Black', 'Impact', 'Times New Roman', serif" 
            font-size="${width * 0.22}" 
            font-weight="900" 
            text-anchor="middle" 
            fill="#18276f" 
            letter-spacing="2">
        S.G.M.
      </text>
    </g>
  </svg>
  `;

  // First composite SGM over the base image
  const composited = await sharp(sourcePath)
    .composite([{ input: Buffer.from(textSvg), top: 0, left: 0 }])
    .toBuffer();

  // Make near-white background transparent
  const image = sharp(composited);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const rgba = Buffer.alloc(info.width * info.height * 4);

  for (let i = 0; i < info.width * info.height; i++) {
    const r = data[i * 3];
    const g = data[i * 3 + 1];
    const b = data[i * 3 + 2];
    const brightness = (r + g + b) / 3;

    rgba[i * 4] = r;
    rgba[i * 4 + 1] = g;
    rgba[i * 4 + 2] = b;

    if (brightness > 235 && Math.abs(r - g) < 25 && Math.abs(g - b) < 25) {
      rgba[i * 4 + 3] = 0; // Transparent
    } else if (brightness > 210) {
      const alpha = Math.max(0, Math.min(255, Math.round((235 - brightness) * 10)));
      rgba[i * 4 + 3] = alpha;
    } else {
      rgba[i * 4 + 3] = 255;
    }
  }

  const finalPng = await sharp(rgba, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    },
  }).png().toBuffer();

  await sharp(finalPng).toFile(path.join(outputDir, 'principal-round-seal.png'));
  console.log('✓ Successfully added S.G.M. to center of principal-round-seal.png with transparent background!');
}

addSgmToSeal().catch(console.error);

