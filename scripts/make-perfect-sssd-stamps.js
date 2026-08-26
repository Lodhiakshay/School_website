const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function makePerfectSSSDStamps() {
  const outputDir = path.join(__dirname, '..', 'public', 'images', 'stamps');
  const sgmSigPath = path.join(outputDir, 'principal-signature.png');

  // 1. GENERATE PERFECT SSSD PRINCIPAL SIGNATURE
  // Extract real green signature & blue underline from SGM signature (top 270px)
  if (fs.existsSync(sgmSigPath)) {
    const sigMeta = await sharp(sgmSigPath).metadata();
    const sigTopCrop = await sharp(sgmSigPath)
      .extract({ left: 0, top: 0, width: sigMeta.width, height: 260 })
      .toBuffer();

    // Text SVG with: Principal, SSSD Public School, Shamsabad, Farrukhabad (All in English)
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

    // Composite them together into a 460px high transparent image
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
    console.log('✓ Generated exact sssd-principal-signature.png with English text & real Ashish signature!');
  }

  // 2. GENERATE PERFECT SSSD PRINCIPAL ROUND SEAL
  const sssdLogoPath = path.join(__dirname, '..', 'public', 'images', 'sssd-logo.png');
  const sealWidth = 900;
  const sealHeight = 900;

  const sealSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${sealWidth} ${sealHeight}" width="${sealWidth}" height="${sealHeight}">
    <defs>
      <!-- Top arc path for SSSD PUBLIC SCHOOL -->
      <path id="topTextArc" d="M 115,450 A 335,335 0 1,1 785,450" fill="none" />
      
      <!-- Bottom arc for SHAMSABAD, FARRUKHABAD -->
      <path id="bottomTextArc" d="M 785,450 A 335,335 0 0,1 115,450" fill="none" />
    </defs>

    <!-- Outer solid double concentric rings in exact SGM Royal Blue (#002060) -->
    <circle cx="450" cy="450" r="425" fill="none" stroke="#002060" stroke-width="22" />
    <circle cx="450" cy="450" r="398" fill="none" stroke="#002060" stroke-width="6" />

    <!-- Inner background -->
    <circle cx="450" cy="450" r="390" fill="#ffffff" />

    <!-- Inner serrated dashed ring -->
    <circle cx="450" cy="450" r="260" fill="none" stroke="#002060" stroke-width="8" stroke-dasharray="14, 8" />
    <circle cx="450" cy="450" r="248" fill="none" stroke="#002060" stroke-width="3" />

    <!-- Left & Right Lotus Motifs (Exact SGM Style) -->
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
    <text font-family="'Times New Roman', Georgia, serif" font-size="52" font-weight="900" fill="#002060" letter-spacing="8">
      <textPath href="#topTextArc" startOffset="50%" text-anchor="middle">
        ★ SSSD PUBLIC SCHOOL ★
      </textPath>
    </text>

    <!-- Bottom Text: SHAMSABAD, FARRUKHABAD (English) -->
    <text font-family="'Times New Roman', Georgia, serif" font-size="34" font-weight="900" fill="#002060" letter-spacing="5">
      <textPath href="#bottomTextArc" startOffset="50%" text-anchor="middle">
        ★ SHAMSABAD, FARRUKHABAD ★
      </textPath>
    </text>

    <!-- Bottom PRINCIPAL Banner with curved ribbon ends (Exact SGM Design) -->
    <g transform="translate(0, 620)">
      <!-- Side Ribbons -->
      <path d="M 180 5 C 150 -20, 130 30, 190 40 L 220 40 L 220 -20 Z" fill="#002060" />
      <path d="M 720 5 C 750 -20, 770 30, 710 40 L 680 40 L 680 -20 Z" fill="#002060" />

      <!-- Main Ribbon Body -->
      <rect x="200" y="-30" width="500" height="70" rx="18" fill="#002060" stroke="#ffffff" stroke-width="3" />
      
      <!-- PRINCIPAL Text in Bold Serif -->
      <text x="450" y="20" font-family="'Times New Roman', Georgia, serif" font-size="46" font-weight="900" text-anchor="middle" fill="#ffffff" letter-spacing="6">
        PRINCIPAL
      </text>
    </g>
  </svg>
  `;

  let compositedSeal = sharp(Buffer.from(sealSvg));
  if (fs.existsSync(sssdLogoPath)) {
    const sssdCenter = await sharp(sssdLogoPath).resize(360, 360).toBuffer();
    compositedSeal = compositedSeal.composite([
      {
        input: sssdCenter,
        top: 220,
        left: 270,
      },
    ]);
  }

  await compositedSeal
    .png()
    .toFile(path.join(outputDir, 'sssd-principal-round-seal.png'));
  console.log('✓ Generated exact sssd-principal-round-seal.png with English Shamsabad Farrukhabad!');
}

makePerfectSSSDStamps().catch(console.error);
