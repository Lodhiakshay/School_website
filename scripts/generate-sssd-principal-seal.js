const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generateSSSDPrincipalSeal() {
  const outputDir = path.join(__dirname, '..', 'public', 'images', 'stamps');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 1. SSSD Circular Principal Stamp (Violet/Blue or Deep Emerald Institutional Ink)
  const sealSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
    <defs>
      <!-- Top arc path for school name -->
      <path id="topArc" d="M 65,250 A 185,185 0 1,1 435,250" fill="none" />
      
      <!-- Bottom arc path for city/location -->
      <path id="bottomArc" d="M 435,250 A 185,185 0 0,1 65,250" fill="none" />
      
      <!-- Subtle ink texture filter -->
      <filter id="stampTexture" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.5" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>

    <g filter="url(#stampTexture)">
      <!-- Outer thick circle -->
      <circle cx="250" cy="250" r="235" fill="none" stroke="#064e3b" stroke-width="9" stroke-linecap="round" />
      
      <!-- Outer thin circle -->
      <circle cx="250" cy="250" r="222" fill="none" stroke="#064e3b" stroke-width="3" />
      
      <!-- Inner dashed/serrated border -->
      <circle cx="250" cy="250" r="148" fill="none" stroke="#064e3b" stroke-width="4" stroke-dasharray="8, 4" />
      <circle cx="250" cy="250" r="138" fill="none" stroke="#064e3b" stroke-width="2.5" />

      <!-- Top Text: SSSD PUBLIC SCHOOL -->
      <text font-family="'Times New Roman', 'Georgia', serif" font-size="28" font-weight="900" fill="#064e3b" letter-spacing="3.5">
        <textPath href="#topArc" startOffset="50%" text-anchor="middle">
          ★ SSSD PUBLIC SCHOOL ★
        </textPath>
      </text>

      <!-- Bottom Text: SHAMSABAD, FARRUKHABAD (U.P.) -->
      <text font-family="'Times New Roman', 'Georgia', serif" font-size="22" font-weight="900" fill="#064e3b" letter-spacing="3.0">
        <textPath href="#bottomArc" startOffset="50%" text-anchor="middle">
          ★ SHAMSABAD, FARRUKHABAD (U.P.) ★
        </textPath>
      </text>

      <!-- Center Inner Badge -->
      <circle cx="250" cy="250" r="130" fill="#ecfdf5" fill-opacity="0.3" />

      <!-- Decorative Stars -->
      <text x="250" y="195" font-size="20" text-anchor="middle" fill="#064e3b">★ ★ ★</text>

      <!-- Center Text: PRINCIPAL -->
      <text x="250" y="248" font-family="'Arial Black', 'Helvetica Neue', sans-serif" font-size="38" font-weight="900" text-anchor="middle" fill="#064e3b" letter-spacing="4">
        PRINCIPAL
      </text>

      <!-- Center Subtitle -->
      <line x1="155" y1="262" x2="345" y2="262" stroke="#064e3b" stroke-width="3" />
      <line x1="175" y1="268" x2="325" y2="268" stroke="#064e3b" stroke-width="1.5" />
      
      <text x="250" y="292" font-family="'Times New Roman', serif" font-size="18" font-weight="bold" text-anchor="middle" fill="#064e3b" letter-spacing="2">
        ENGLISH MEDIUM
      </text>

      <text x="250" y="314" font-family="'Times New Roman', serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#047857" letter-spacing="1.5">
        CBSE PATTERN • ESTD 2012
      </text>
    </g>
  </svg>
  `;

  await sharp(Buffer.from(sealSvg))
    .png()
    .toFile(path.join(outputDir, 'sssd-principal-round-seal.png'));
  console.log('✓ Generated public/images/stamps/sssd-principal-round-seal.png');

  // 2. SSSD Principal Signature with SSSD designation
  const sigSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" width="600" height="300">
    <!-- Signature Path -->
    <path d="M 45 175 Q 95 35 145 85 Q 185 125 215 55 Q 245 10 265 115 Q 295 165 345 75 Q 405 20 455 85 Q 505 145 565 65 M 65 135 Q 255 175 575 105" 
          fill="none" stroke="#0f766e" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" opacity="0.95" />
    
    <!-- Designation line -->
    <line x1="40" y1="210" x2="560" y2="210" stroke="#064e3b" stroke-width="4.5" />
    
    <!-- English Designation -->
    <text x="300" y="245" font-family="'Times New Roman', Georgia, serif" font-size="28" font-weight="bold" text-anchor="middle" fill="#064e3b" letter-spacing="3">
      Principal
    </text>
    
    <!-- Subtitle School Name -->
    <text x="300" y="278" font-family="'Arial', sans-serif" font-size="20" font-weight="bold" text-anchor="middle" fill="#047857">
      SSSD Public School, Shamsabad
    </text>
  </svg>
  `;

  await sharp(Buffer.from(sigSvg))
    .png()
    .toFile(path.join(outputDir, 'sssd-principal-signature.png'));
  console.log('✓ Generated public/images/stamps/sssd-principal-signature.png');
}

generateSSSDPrincipalSeal().catch(console.error);
