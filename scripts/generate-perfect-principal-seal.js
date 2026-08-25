const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generatePrincipalSeal() {
  const outputDir = path.join(__dirname, '..', 'public', 'images', 'stamps');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Generate SVG with curved text:
  // Top: SARSWATI GYAN MANDIR INTER COLLEGE
  // Bottom: SHAMSABAD, FARRUKHABAD (U.P.)
  // Center: PRINCIPAL with stars & ESTD 1999
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
    <defs>
      <!-- Top arc path for school name -->
      <path id="topArc" d="M 65,250 A 185,185 0 1,1 435,250" fill="none" />
      
      <!-- Bottom arc path for city/location -->
      <path id="bottomArc" d="M 435,250 A 185,185 0 0,1 65,250" fill="none" />
      
      <!-- Inner top arc for secondary text if needed -->
      <path id="innerTopArc" d="M 110,250 A 140,140 0 1,1 390,250" fill="none" />
      
      <!-- Subtle ink texture filter -->
      <filter id="stampTexture" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.5" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>

    <g filter="url(#stampTexture)">
      <!-- Outer thick circle -->
      <circle cx="250" cy="250" r="235" fill="none" stroke="#002060" stroke-width="9" stroke-linecap="round" />
      
      <!-- Outer thin circle -->
      <circle cx="250" cy="250" r="222" fill="none" stroke="#002060" stroke-width="3" />
      
      <!-- Inner dashed/serrated border -->
      <circle cx="250" cy="250" r="148" fill="none" stroke="#002060" stroke-width="4" stroke-dasharray="8, 4" />
      <circle cx="250" cy="250" r="138" fill="none" stroke="#002060" stroke-width="2.5" />

      <!-- Top Text: SARSWATI GYAN MANDIR INTER. COLLEGE -->
      <text font-family="'Times New Roman', 'Georgia', serif" font-size="25.5" font-weight="900" fill="#002060" letter-spacing="2.8">
        <textPath href="#topArc" startOffset="50%" text-anchor="middle">
          ★ SARSWATI GYAN MANDIR INTER. COLLEGE ★
        </textPath>
      </text>

      <!-- Bottom Text: SHAMSABAD, FARRUKHABAD (U.P.) -->
      <text font-family="'Times New Roman', 'Georgia', serif" font-size="23" font-weight="900" fill="#002060" letter-spacing="3.2">
        <textPath href="#bottomArc" startOffset="50%" text-anchor="middle">
          ★ SHAMSABAD, FARRUKHABAD (U.P.) ★
        </textPath>
      </text>

      <!-- Center Inner Badge -->
      <circle cx="250" cy="250" r="130" fill="#f8fafc" fill-opacity="0.25" />

      <!-- Decorative Stars -->
      <text x="250" y="195" font-size="20" text-anchor="middle" fill="#002060">★ ★ ★</text>

      <!-- Center Text: PRINCIPAL -->
      <text x="250" y="248" font-family="'Arial Black', 'Helvetica Neue', sans-serif" font-size="38" font-weight="900" text-anchor="middle" fill="#002060" letter-spacing="4">
        PRINCIPAL
      </text>

      <!-- Center Subtitle: ESTD 1999 / AFFIL. NO -->
      <line x1="160" y1="262" x2="340" y2="262" stroke="#002060" stroke-width="3" />
      <line x1="175" y1="268" x2="325" y2="268" stroke="#002060" stroke-width="1.5" />
      
      <text x="250" y="292" font-family="'Times New Roman', serif" font-size="19" font-weight="bold" text-anchor="middle" fill="#002060" letter-spacing="2">
        ESTD. 1999
      </text>

      <text x="250" y="314" font-family="'Times New Roman', serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1e3a8a" letter-spacing="1">
        CODE: UP-FBD-2026-089
      </text>
    </g>
  </svg>
  `;

  // Render to high-res PNG (500x500 transparent)
  await sharp(Buffer.from(svg))
    .png()
    .toFile(path.join(outputDir, 'principal-round-seal.png'));
  console.log('✓ Created perfect principal-round-seal.png with School Name & Shamsabad Location!');

  // Also create a combined Principal Signature with this new Official Seal overlay:
  const sigSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" width="600" height="300">
    <!-- Green Realistic Signature Path -->
    <path d="M 40 180 Q 90 40 140 90 Q 180 130 210 60 Q 240 10 260 120 Q 290 170 340 80 Q 400 20 450 90 Q 500 150 560 70 M 60 140 Q 250 180 570 110" 
          fill="none" stroke="#0f766e" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" opacity="0.95" />
    
    <!-- Designation line -->
    <line x1="30" y1="210" x2="570" y2="210" stroke="#002060" stroke-width="5" />
    
    <!-- Principal Text in Royal Navy -->
    <text x="300" y="252" font-family="'Times New Roman', serif" font-size="38" font-weight="900" text-anchor="middle" fill="#002060" letter-spacing="3">
      Principal
    </text>
    <text x="300" y="280" font-family="'Times New Roman', serif" font-size="22" font-weight="900" text-anchor="middle" fill="#002060">
      सरस्वती ज्ञान मन्दिर इण्टर कॉलेज
    </text>
    <text x="300" y="300" font-family="'Times New Roman', serif" font-size="16" font-weight="bold" text-anchor="middle" fill="#475569">
      शमसाबाद (फ़र्रूख़ाबाद)
    </text>
  </svg>
  `;

  await sharp(Buffer.from(sigSvg))
    .png()
    .toFile(path.join(outputDir, 'principal-signature-clear.png'));
  console.log('✓ Created clean principal-signature-clear.png with full Hindi school name & location!');
}

generatePrincipalSeal().catch(console.error);

