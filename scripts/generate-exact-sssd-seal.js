const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generateExactSSSDSeal() {
  const outputDir = path.join(__dirname, '..', 'public', 'images', 'stamps');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Generate ultra high resolution 1000x1000 SVG seal in exact SGM Royal Blue (#002060 / #0a1f73) style
  const sealSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="1000" height="1000">
    <defs>
      <!-- Top arc for School Title -->
      <path id="sealTopArc" d="M 120,500 A 380,380 0 1,1 880,500" fill="none" />
      
      <!-- Bottom arc for Location -->
      <path id="sealBottomArc" d="M 880,500 A 380,380 0 0,1 120,500" fill="none" />

      <!-- Center gradient & texture -->
      <radialGradient id="sealGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="1" />
        <stop offset="85%" stop-color="#f0f4ff" stop-opacity="0.8" />
        <stop offset="100%" stop-color="#002060" stop-opacity="0.1" />
      </radialGradient>
    </defs>

    <!-- Outer double concentric solid rings -->
    <circle cx="500" cy="500" r="475" fill="none" stroke="#002060" stroke-width="22" />
    <circle cx="500" cy="500" r="448" fill="none" stroke="#002060" stroke-width="6" />

    <!-- Inner background -->
    <circle cx="500" cy="500" r="440" fill="url(#sealGlow)" />

    <!-- Inner decorative serrated ring -->
    <circle cx="500" cy="500" r="290" fill="none" stroke="#002060" stroke-width="8" stroke-dasharray="16, 10" />
    <circle cx="500" cy="500" r="275" fill="none" stroke="#002060" stroke-width="4" />

    <!-- Left & Right Decorative Lotus Flowers -->
    <g transform="translate(100, 480) scale(0.65)">
      <path d="M 50 0 C 20 -40, 20 -70, 50 -100 C 80 -70, 80 -40, 50 0 Z" fill="#002060" />
      <path d="M 50 0 C 0 -30, -30 -50, -20 -80 C 10 -65, 30 -40, 50 0 Z" fill="#002060" />
      <path d="M 50 0 C 100 -30, 130 -50, 120 -80 C 90 -65, 70 -40, 50 0 Z" fill="#002060" />
    </g>
    <g transform="translate(830, 480) scale(0.65)">
      <path d="M 50 0 C 20 -40, 20 -70, 50 -100 C 80 -70, 80 -40, 50 0 Z" fill="#002060" />
      <path d="M 50 0 C 0 -30, -30 -50, -20 -80 C 10 -65, 30 -40, 50 0 Z" fill="#002060" />
      <path d="M 50 0 C 100 -30, 130 -50, 120 -80 C 90 -65, 70 -40, 50 0 Z" fill="#002060" />
    </g>

    <!-- Top Curved Text: SSSD PUBLIC SCHOOL -->
    <text font-family="'Times New Roman', Georgia, serif" font-size="62" font-weight="900" fill="#002060" letter-spacing="9">
      <textPath href="#sealTopArc" startOffset="50%" text-anchor="middle">
        SSSD PUBLIC SCHOOL
      </textPath>
    </text>

    <!-- Center Art: Torch of Knowledge & Open Book Emblem with Radiant Sun & Laurel Wreath -->
    <g transform="translate(500, 360)">
      <!-- Sun Rays -->
      <g stroke="#002060" stroke-width="4" stroke-linecap="round" opacity="0.85">
        <line x1="0" y1="-120" x2="0" y2="-90" />
        <line x1="-50" y1="-110" x2="-35" y2="-85" />
        <line x1="50" y1="-110" x2="35" y2="-85" />
        <line x1="-90" y1="-80" x2="-65" y2="-65" />
        <line x1="90" y1="-80" x2="65" y2="-65" />
        <line x1="-110" y1="-40" x2="-80" y2="-35" />
        <line x1="110" y1="-40" x2="80" y2="-35" />
      </g>

      <!-- Laurel Leaves on Left and Right -->
      <path d="M -90 40 C -120 0, -120 -60, -80 -90 C -90 -50, -70 -20, -50 20 Z" fill="#002060" />
      <path d="M 90 40 C 120 0, 120 -60, 80 -90 C 90 -50, 70 -20, 50 20 Z" fill="#002060" />

      <!-- Flaming Torch (Mashal) in Center -->
      <path d="M 0 -85 C -25 -65, -15 -45, 0 -30 C 15 -45, 25 -65, 0 -85 Z" fill="#002060" />
      <path d="M -5 -80 C -15 -60, -5 -45, 0 -35 C 5 -45, 15 -60, -5 -80 Z" fill="#ffffff" />
      
      <!-- Torch Holder -->
      <polygon points="-16,-28 16,-28 10,-5 -10,-5" fill="#002060" />
      <polygon points="-12,-5 12,-5 8,45 -8,45" fill="#002060" />

      <!-- Open Book of Knowledge -->
      <path d="M 0 5 C -35 -15, -75 -15, -95 10 L -95 65 C -75 45, -35 45, 0 65 C 35 45, 75 45, 95 65 L 95 10 C 75 -15, 35 -15, 0 5 Z" fill="#ffffff" stroke="#002060" stroke-width="8" stroke-linejoin="round" />
      <line x1="0" y1="5" x2="0" y2="65" stroke="#002060" stroke-width="6" />
      <!-- Book Lines -->
      <line x1="-80" y1="18" x2="-20" y2="18" stroke="#002060" stroke-width="4" stroke-linecap="round" />
      <line x1="-80" y1="32" x2="-20" y2="32" stroke="#002060" stroke-width="4" stroke-linecap="round" />
      <line x1="-80" y1="46" x2="-35" y2="46" stroke="#002060" stroke-width="4" stroke-linecap="round" />

      <line x1="20" y1="18" x2="80" y2="18" stroke="#002060" stroke-width="4" stroke-linecap="round" />
      <line x1="20" y1="32" x2="80" y2="32" stroke="#002060" stroke-width="4" stroke-linecap="round" />
      <line x1="35" y1="46" x2="80" y2="46" stroke="#002060" stroke-width="4" stroke-linecap="round" />
    </g>

    <!-- Bottom PRINCIPAL Banner Ribbon with Flourish Curves (Exact SGM Style) -->
    <g transform="translate(0, 710)">
      <!-- Side Ribbons -->
      <path d="M 180 5 C 150 -20, 130 30, 190 40 L 220 40 L 220 -20 Z" fill="#002060" />
      <path d="M 820 5 C 850 -20, 870 30, 810 40 L 780 40 L 780 -20 Z" fill="#002060" />

      <!-- Main Ribbon Body -->
      <rect x="210" y="-32" width="580" height="74" rx="20" fill="#002060" stroke="#ffffff" stroke-width="4" />
      
      <!-- PRINCIPAL Text in Bold Serif -->
      <text x="500" y="22" font-family="'Times New Roman', Georgia, serif" font-size="52" font-weight="900" text-anchor="middle" fill="#ffffff" letter-spacing="8">
        PRINCIPAL
      </text>
    </g>

    <!-- Bottom Location Ribbon Arc: SHAMSABAD, FARRUKHABAD -->
    <g transform="translate(0, 120)">
      <path d="M 240 700 Q 500 800 760 700" fill="none" stroke="#002060" stroke-width="8" stroke-linecap="round" />
      <text x="500" y="748" font-family="'Times New Roman', Georgia, serif" font-size="34" font-weight="900" text-anchor="middle" fill="#002060" letter-spacing="4">
        ★ SHAMSABAD, FARRUKHABAD ★
      </text>
    </g>
  </svg>
  `;

  await sharp(Buffer.from(sealSvg))
    .png()
    .toFile(path.join(outputDir, 'sssd-principal-round-seal.png'));
  console.log('✓ Generated exact SSSD Principal Round Seal in SGM style!');

  // Generate exact SSSD Principal Signature in SGM style:
  // Using the exact Ashish signature graphic with "Principal / SSSD Public School / शमसाबाद, फ़र्रुख़ाबाद"
  const sigSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500" width="600" height="500">
    <!-- Green Realistic Signature Path matching Ashish signature -->
    <path d="M 120 250 Q 180 70 240 130 Q 290 180 330 90 Q 370 20 395 160 Q 430 220 490 120 Q 560 40 610 120 M 140 210 Q 380 250 580 150" 
          fill="none" stroke="#0d6d53" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" transform="scale(0.85) translate(30, 20)" />
    
    <!-- Dark Blue Horizontal Line -->
    <line x1="80" y1="285" x2="520" y2="285" stroke="#002060" stroke-width="6" />

    <!-- Principal in Bold Serif -->
    <text x="300" y="345" font-family="'Times New Roman', Georgia, serif" font-size="52" font-weight="900" text-anchor="middle" fill="#002060" letter-spacing="2">
      Principal
    </text>

    <!-- SSSD Public School in exact SGM style -->
    <text x="300" y="405" font-family="'Times New Roman', Georgia, serif" font-size="38" font-weight="900" text-anchor="middle" fill="#002060">
      SSSD Public School
    </text>

    <!-- Location -->
    <text x="300" y="455" font-family="'Times New Roman', Georgia, serif" font-size="32" font-weight="bold" text-anchor="middle" fill="#002060">
      शमसाबाद, फ़र्रुख़ाबाद
    </text>
  </svg>
  `;

  await sharp(Buffer.from(sigSvg))
    .png()
    .toFile(path.join(outputDir, 'sssd-principal-signature.png'));
  console.log('✓ Generated exact SSSD Principal Signature in SGM style!');
}

generateExactSSSDSeal().catch(console.error);
