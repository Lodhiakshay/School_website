const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function processSSSDLogo() {
  const sourcePath = 'C:/Users/akshay kumar/.gemini/antigravity/brain/4534c4ab-9983-474c-bd77-50136a81ee91/.user_uploaded/media_1787730768692.jpg';
  const outputDir = path.join(__dirname, '..', 'public', 'images');
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const metadata = await sharp(sourcePath).metadata();
  const size = Math.min(metadata.width || 1024, metadata.height || 1024);

  // Resize and create high-res transparent circular logo
  const resizedBuffer = await sharp(sourcePath)
    .resize(size, size, { fit: 'cover' })
    .toBuffer();

  const circleMaskSvg = `
  <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 4}" fill="#ffffff" />
  </svg>
  `;

  const finalPng = await sharp(resizedBuffer)
    .composite([{ input: Buffer.from(circleMaskSvg), blend: 'dest-in' }])
    .png()
    .toBuffer();

  await sharp(finalPng).toFile(path.join(outputDir, 'sssd-logo.png'));
  console.log('✓ Successfully processed and saved sssd-logo.png in public/images/!');
}

processSSSDLogo().catch(console.error);

