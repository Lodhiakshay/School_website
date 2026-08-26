const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function buildExactMatchingSSSDSeal() {
  const outputDir = path.join(__dirname, '..', 'public', 'images', 'stamps');
  
  // 1. Generate SSSD Principal Signature in the EXACT same visual format as SGM
  // SGM signature format: 600x480, green pen stroke, dark blue line, 'Principal', 'SSSD Public School', 'शमसाबाद, फ़र्रुख़ाबाद'
  const sigSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 480" width="600" height="480">
    <!-- Green Realistic Signature Path matching Ashish signature exactly -->
    <path d="M 125 210 Q 170 50 215 115 Q 260 165 295 80 Q 330 20 350 140 Q 380 195 435 110 Q 495 30 545 105 M 140 180 Q 340 220 530 135" 
          fill="none" stroke="#0e6b52" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" />
    
    <!-- Dark Blue Horizontal Line -->
    <line x1="80" y1="260" x2="520" y2="260" stroke="#002060" stroke-width="8" />

    <!-- Principal in Bold Serif -->
    <text x="300" y="325" font-family="'Times New Roman', Georgia, serif" font-size="52" font-weight="900" text-anchor="middle" fill="#002060" letter-spacing="1">
      Principal
    </text>

    <!-- SSSD Public School in Bold Serif -->
    <text x="300" y="385" font-family="'Times New Roman', Georgia, serif" font-size="40" font-weight="900" text-anchor="middle" fill="#002060">
      SSSD Public School
    </text>

    <!-- Location -->
    <text x="300" y="440" font-family="'Times New Roman', Georgia, serif" font-size="36" font-weight="bold" text-anchor="middle" fill="#002060">
      शमसाबाद, फ़र्रुख़ाबाद
    </text>
  </svg>
  `;

  await sharp(Buffer.from(sigSvg))
    .png()
    .toFile(path.join(outputDir, 'sssd-principal-signature.png'));
  console.log('✓ Generated exact sssd-principal-signature.png matching SGM signature!');

  // 2. Generate SSSD Principal Round Seal:
  // Using SSSD logo as high-res monochrome royal navy emblem in the center
  const sssdLogoPath = path.join(__dirname, '..', 'public', 'images', 'sssd-logo.png');
  let sssdCenterBuffer;
  
  if (fs.existsSync(sssdLogoPath)) {
    // Process SSSD logo to crisp circular monochrome/navy emblem
    sssdCenterBuffer = await sharp(sssdLogoPath)
      .resize(460, 460)
      .toBuffer();
  }

  // Create SVG Stamp with curved paths
  const sealWidth = 900;
  const sealHeight = 900;
  const sealSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${sealWidth} ${sealHeight}" width="${sealWidth}" height="${sealHeight}">
    <defs>
      <!-- Top arc path for SSSD PUBLIC SCHOOL (upward sweep) -->
      <path id="topTextArc" d="M 120,450 A 330,330 0 0,1 780,450" fill="none" />
      <!-- Bottom arc for SHAMSABAD, FARRUKHABAD (downward sweep) -->
      <path id="bottomTextArc" d="M 160,540 A 330,330 0 0,0 740,540" fill="none" />
    </defs>

    <!-- Outer double concentric solid rings in exact SGM Blue #002060 -->
    <circle cx="450" cy="450" r="425" fill="none" stroke="#002060" stroke-width="20" />
    <circle cx="450" cy="450" r="400" fill="none" stroke="#002060" stroke-width="6" />

    <!-- Inner serrated ring -->
    <circle cx="450" cy="450" r="260" fill="none" stroke="#002060" stroke-width="8" stroke-dasharray="14, 8" />
    <circle cx="450" cy="450" r="248" fill="none" stroke="#002060" stroke-width="3" />

    <!-- Left & Right Lotus Motifs (Exact SGM style) -->
    <g transform="translate(60, 420) scale(0.6)">
      <path d="M 50 0 C 20 -40, 20 -70, 50 -100 C 80 -70, 80 -40, 50 0 Z" fill="#002060" />
      <path d="M 50 0 C 0 -30, -30 -50, -20 -80 C 10 -65, 30 -40, 50 0 Z" fill="#002060" />
      <path d="M 50 0 C 100 -30, 130 -50, 120 -80 C 90 -65, 70 -40, 50 0 Z" fill="#002060" />
    </g>
    <g transform="translate(760, 420) scale(0.6)">
      <path d="M 50 0 C 20 -40, 20 -70, 50 -100 C 80 -70, 80 -40, 50 0 Z" fill="#002060" />
      <path d="M 50 0 C 0 -30, -30 -50, -20 -80 C 10 -65, 30 -40, 50 0 Z" fill="#002060" />
      <path d="M 50 0 C 100 -30, 130 -50, 120 -80 C 90 -65, 70 -40, 50 0 Z" fill="#002060" />
    </g>

    <!-- Top Text: SSSD PUBLIC SCHOOL -->
    <text font-family="'Times New Roman', Georgia, serif" font-size="54" font-weight="900" fill="#002060" letter-spacing="7">
      <textPath href="#topTextArc" startOffset="50%" text-anchor="middle">
        ★ SSSD PUBLIC SCHOOL ★
      </textPath>
    </text>

    <!-- Bottom PRINCIPAL Banner with curved ribbon ends (Exact SGM Design) -->
    <g transform="translate(0, 620)">
      <!-- Side Ribbons -->
      <path d="M 180 5 C 150 -20, 130 30, 190 40 L 220 40 L 220 -20 Z" fill="#002060" />
      <path d="M 720 5 C 750 -20, 770 30, 710 40 L 680 40 L 680 -20 Z" fill="#002060" />

      <!-- Main Ribbon Body -->
      <rect x="200" y="-30" width="500" height="70" rx="18" fill="#002060" stroke="#ffffff" stroke-width="3" />
      
      <!-- PRINCIPAL Text -->
      <text x="450" y="20" font-family="'Times New Roman', Georgia, serif" font-size="46" font-weight="900" text-anchor="middle" fill="#ffffff" letter-spacing="6">
        PRINCIPAL
      </text>
    </g>

    <!-- Bottom Sub-Arc: शमसाबाद, फ़र्रुख़ाबाद -->
    <text font-family="'Times New Roman', Georgia, serif" font-size="34" font-weight="900" fill="#002060" letter-spacing="4">
      <textPath href="#bottomTextArc" startOffset="50%" text-anchor="middle">
        ★ शमसाबाद, फ़र्रुख़ाबाद ★
      </textPath>
    </text>
  </svg>
  `;

  // Composite the SSSD logo into the center of the seal
  let compositedSeal = sharp(Buffer.from(sealSvg));
  if (sssdCenterBuffer) {
    compositedSeal = compositedSeal.composite([
      {
        input: await sharp(sssdCenterBuffer).resize(360, 360).toBuffer(),
        top: 220,
        left: 270,
      },
    ]);
  }

  await compositedSeal
    .png()
    .toFile(path.join(outputDir, 'sssd-principal-round-seal.png'));
  console.log('✓ Generated exact SSSD Principal Round Seal in SGM style!');
}

buildExactMatchingSSSDSeal().catch(console.error);
