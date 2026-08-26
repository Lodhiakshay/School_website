const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function makeBlueSSSDStamps() {
  const outputDir = path.join(__dirname, '..', 'public', 'images', 'stamps');
  const sgmSigPath = path.join(outputDir, 'principal-signature.png');

  // 1. SSSD Principal Signature with Green Pen Signature + Royal Blue Text & Underline
  if (fs.existsSync(sgmSigPath)) {
    const sigMeta = await sharp(sgmSigPath).metadata();
    const sigTopCrop = await sharp(sgmSigPath)
      .extract({ left: 0, top: 0, width: sigMeta.width, height: 260 })
      .toBuffer();

    const textSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${sigMeta.width} 200" width="${sigMeta.width}" height="200">
      <text x="${sigMeta.width / 2}" y="45" font-family="'Times New Roman', Georgia, serif" font-size="52" font-weight="900" text-anchor="middle" fill="#002060" letter-spacing="1">
        Principal
      </text>
      <text x="${sigMeta.width / 2}" y="105" font-family="'Times New Roman', Georgia, serif" font-size="42" font-weight="900" text-anchor="middle" fill="#002060">
        SSSD Public School
      </text>
      <text x="${sigMeta.width / 2}" y="160" font-family="'Times New Roman', Georgia, serif" font-size="34" font-weight="bold" text-anchor="middle" fill="#002060" letter-spacing="0.5">
        Shamsabad, Farrukhabad
      </text>
    </svg>
    `;

    const textBuffer = await sharp(Buffer.from(textSvg)).png().toBuffer();

    const combinedSig = await sharp({
      create: {
        width: sigMeta.width,
        height: 460,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    })
      .composite([
        { input: sigTopCrop, top: 0, left: 0 },
        { input: textBuffer, top: 260, left: 0 },
      ])
      .png()
      .toBuffer();

    await sharp(combinedSig).toFile(path.join(outputDir, 'sssd-principal-signature.png'));
    console.log('✓ Generated classic Royal Blue sssd-principal-signature.png with English text!');
  }

  // 2. SSSD Principal Round Seal in Classic Royal Blue (#002060) Stamp Ink
  function createArcText(text, cx, cy, radius, startAngleDeg, endAngleDeg, fontSize, fontWeight, fill, isBottom = false) {
    const chars = text.split('');
    const step = (endAngleDeg - startAngleDeg) / (chars.length - 1);
    
    return chars.map((char, i) => {
      const angle = startAngleDeg + i * step;
      const rad = (angle * Math.PI) / 180;
      const x = cx + radius * Math.sin(rad);
      const y = cy - radius * Math.cos(rad);
      const rot = isBottom ? angle + 180 : angle;

      return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-family="'Times New Roman', Georgia, serif" font-size="${fontSize}" font-weight="${fontWeight}" fill="${fill}" text-anchor="middle" dominant-baseline="central" transform="rotate(${rot.toFixed(1)}, ${x.toFixed(1)}, ${y.toFixed(1)})">${char}</text>`;
    }).join('\n');
  }

  const cx = 250;
  const cy = 250;
  const topText = "★ SSSD PUBLIC SCHOOL ★";
  const bottomText = "★ SHAMSABAD, FARRUKHABAD ★";

  const topCharsSvg = createArcText(topText, cx, cy, 185, -70, 70, 26, "900", "#002060", false);
  const bottomCharsSvg = createArcText(bottomText, cx, cy, 185, 245, 115, 20, "900", "#002060", true);

  const sealSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
    <defs>
      <filter id="stampTexture" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>

    <g filter="url(#stampTexture)">
      <!-- Outer thick circle in Classic Royal Blue Stamp Ink #002060 -->
      <circle cx="250" cy="250" r="235" fill="none" stroke="#002060" stroke-width="9" stroke-linecap="round" />
      
      <!-- Outer thin circle -->
      <circle cx="250" cy="250" r="222" fill="none" stroke="#002060" stroke-width="3" />
      
      <!-- Inner dashed/serrated border -->
      <circle cx="250" cy="250" r="148" fill="none" stroke="#002060" stroke-width="4" stroke-dasharray="8, 4" />
      <circle cx="250" cy="250" r="138" fill="none" stroke="#002060" stroke-width="2.5" />

      <!-- Top Curved Text Characters (SSSD PUBLIC SCHOOL) -->
      ${topCharsSvg}

      <!-- Bottom Curved Text Characters (SHAMSABAD, FARRUKHABAD) -->
      ${bottomCharsSvg}

      <!-- Center Inner Badge Background -->
      <circle cx="250" cy="250" r="130" fill="#f8fafc" fill-opacity="0.25" />

      <!-- Decorative Stars -->
      <text x="250" y="195" font-size="20" text-anchor="middle" fill="#002060">★ ★ ★</text>

      <!-- Center Text: PRINCIPAL -->
      <text x="250" y="248" font-family="'Arial Black', 'Helvetica Neue', sans-serif" font-size="38" font-weight="900" text-anchor="middle" fill="#002060" letter-spacing="4">
        PRINCIPAL
      </text>

      <!-- Center Subtitle -->
      <line x1="160" y1="262" x2="340" y2="262" stroke="#002060" stroke-width="3" />
      <line x1="175" y1="268" x2="325" y2="268" stroke="#002060" stroke-width="1.5" />
      
      <text x="250" y="292" font-family="'Times New Roman', serif" font-size="19" font-weight="bold" text-anchor="middle" fill="#002060" letter-spacing="2">
        ENGLISH MEDIUM
      </text>

      <text x="250" y="314" font-family="'Times New Roman', serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#002060" letter-spacing="1">
        CBSE PATTERN • SHAMSABAD
      </text>
    </g>
  </svg>
  `;

  await sharp(Buffer.from(sealSvg))
    .png()
    .toFile(path.join(outputDir, 'sssd-principal-round-seal.png'));
  console.log('✓ Generated classic Royal Blue sssd-principal-round-seal.png with English text!');
}

makeBlueSSSDStamps().catch(console.error);
