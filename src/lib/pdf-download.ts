import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

/**
 * Downloads any DOM element as a high-resolution, pixel-perfect, guaranteed single-page A4 PDF.
 * Uses a standardized 794px (210mm @ 96DPI) staging canvas so mobile phones export the exact same
 * grand desktop marksheet layout without vertical slicing across multiple pages.
 *
 * @param elementId DOM ID of the element to capture
 * @param fileName Name of the downloaded PDF file (e.g. 'Aarav_Sharma_Report_Card.pdf')
 */
export async function downloadElementAsPdf(elementId: string, fileName: string = 'document.pdf'): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id "${elementId}" not found for PDF export.`);
    return false;
  }

  // Create standard A4 fixed staging wrapper (794px width)
  // Ensures mobile viewports render the exact desktop A4 document without squishing or slicing
  const a4Wrapper = document.createElement('div');
  a4Wrapper.style.position = 'fixed';
  a4Wrapper.style.top = '0';
  a4Wrapper.style.left = '0';
  a4Wrapper.style.width = '794px';
  a4Wrapper.style.minWidth = '794px';
  a4Wrapper.style.maxWidth = '794px';
  a4Wrapper.style.zIndex = '-9999';
  a4Wrapper.style.opacity = '1';
  a4Wrapper.style.pointerEvents = 'none';
  a4Wrapper.style.backgroundColor = '#ffffff';
  a4Wrapper.style.boxSizing = 'border-box';

  const clone = element.cloneNode(true) as HTMLElement;
  clone.style.width = '100%';
  clone.style.maxWidth = '100%';
  clone.style.margin = '0';
  clone.style.transform = 'none';

  a4Wrapper.appendChild(clone);
  document.body.appendChild(a4Wrapper);

  try {
    const dataUrl = await toPng(a4Wrapper, {
      quality: 1.0,
      pixelRatio: 2.5,
      backgroundColor: '#ffffff',
      cacheBust: true,
      filter: (node: HTMLElement) => {
        if (node.classList && node.classList.contains('no-print')) {
          return false;
        }
        return true;
      },
    });

    document.body.removeChild(a4Wrapper);

    const img = new Image();
    img.src = dataUrl;
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    const pdfWidthMm = 210; // Standard A4 width (mm)
    const pdfHeightMm = 297; // Standard A4 height (mm)

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // Proportional single-page fit: scale document to fit perfectly on 1 single A4 sheet
    const imgAspect = img.height / img.width;
    let renderWidth = pdfWidthMm - 8; // 4mm margin on each side
    let renderHeight = renderWidth * imgAspect;

    if (renderHeight > pdfHeightMm - 8) {
      const scale = (pdfHeightMm - 8) / renderHeight;
      renderWidth = renderWidth * scale;
      renderHeight = renderHeight * scale;
    }

    const xOffset = (pdfWidthMm - renderWidth) / 2;
    const yOffset = (pdfHeightMm - renderHeight) / 2;

    pdf.addImage(
      dataUrl,
      'PNG',
      Math.max(0, xOffset),
      Math.max(0, yOffset),
      renderWidth,
      renderHeight,
      undefined,
      'SLOW'
    );

    // Embed selectable & copyable text layer aligned over the visual layout
    try {
      const wrapperRect = a4Wrapper.getBoundingClientRect();
      const textElements = a4Wrapper.querySelectorAll('h1, h2, h3, h4, p, span, th, td, div');
      const scaleX = renderWidth / (wrapperRect.width || 794);
      const scaleY = renderHeight / (wrapperRect.height || 1);

      textElements.forEach((el) => {
        if (el.children.length === 0 && el.textContent?.trim()) {
          const rect = el.getBoundingClientRect();
          const relX = rect.left - wrapperRect.left;
          const relY = rect.top - wrapperRect.top;

          const xMm = xOffset + relX * scaleX;
          const yMm = yOffset + (relY + rect.height * 0.75) * scaleY;

          const text = el.textContent.trim();
          if (text && xMm >= 0 && yMm >= 0 && xMm <= pdfWidthMm && yMm <= pdfHeightMm) {
            try {
              const fontSizePt = Math.max(5, Math.min(16, rect.height * scaleY * 2.83));
              pdf.setFontSize(fontSizePt);
              pdf.text(text, xMm, yMm, { renderingMode: 'invisible' });
            } catch {
              // Ignore encoding anomalies for complex unicode
            }
          }
        }
      });
    } catch (textLayerErr) {
      console.warn('Text layer injection notice:', textLayerErr);
    }

    const finalFileName = fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`;
    pdf.save(finalFileName);
    return true;
  } catch (err) {
    if (document.body.contains(a4Wrapper)) {
      document.body.removeChild(a4Wrapper);
    }
    console.error('Error generating PDF:', err);
    printIsolatedDocument(elementId);
    return false;
  }
}

/**
 * Downloads ID Badges / Smart PVC Cards as Ultra High-Definition CR80 PNG images.
 * Preserves the exact vertical aspect ratio (1 : 1.58) without expanding horizontally.
 *
 * @param elementId DOM ID of the ID badge card
 * @param fileName Name of the downloaded image file (e.g. 'Student_ID_Aarav.png')
 */
export async function downloadElementAsImage(elementId: string, fileName: string = 'badge.png'): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id "${elementId}" not found for image export.`);
    return false;
  }

  // Determine exact natural width of the card element (e.g. 260px - 280px)
  const elementRect = element.getBoundingClientRect();
  const cardWidth = Math.max(260, Math.min(300, elementRect.width || 270));

  // Create CR80 standard staging canvas matching the card's exact natural width + 16px safety margins
  const badgeWrapper = document.createElement('div');
  badgeWrapper.style.position = 'fixed';
  badgeWrapper.style.top = '0';
  badgeWrapper.style.left = '0';
  badgeWrapper.style.width = `${cardWidth + 24}px`;
  badgeWrapper.style.minWidth = `${cardWidth + 24}px`;
  badgeWrapper.style.maxWidth = `${cardWidth + 24}px`;
  badgeWrapper.style.zIndex = '-9999';
  badgeWrapper.style.opacity = '1';
  badgeWrapper.style.pointerEvents = 'none';
  badgeWrapper.style.backgroundColor = '#ffffff';
  badgeWrapper.style.boxSizing = 'border-box';
  badgeWrapper.style.padding = '12px'; // Safety padding prevents any corner clipping

  const clone = element.cloneNode(true) as HTMLElement;
  clone.style.width = `${cardWidth}px`;
  clone.style.maxWidth = `${cardWidth}px`;
  clone.style.margin = '0 auto';
  clone.style.transform = 'none';
  clone.style.boxSizing = 'border-box';

  badgeWrapper.appendChild(clone);
  document.body.appendChild(badgeWrapper);

  try {
    const dataUrl = await toPng(badgeWrapper, {
      quality: 1.0,
      pixelRatio: 3.5, // 350+ DPI crystal-clear sharpness
      backgroundColor: '#ffffff',
      cacheBust: true,
      filter: (node: HTMLElement) => {
        if (node.classList && node.classList.contains('no-print')) {
          return false;
        }
        return true;
      },
    });

    document.body.removeChild(badgeWrapper);

    const link = document.createElement('a');
    link.download = fileName.endsWith('.png') ? fileName : `${fileName}.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch (err) {
    if (document.body.contains(badgeWrapper)) {
      document.body.removeChild(badgeWrapper);
    }
    console.error('Error downloading image:', err);
    return false;
  }
}

/**
 * Production-Grade Native Vector Document Print / Save as PDF.
 * Clones the exact HTML DOM tree with all stylesheets, Tailwind classes, and SVG elements
 * into an isolated print sandbox. Correctly handles both Full-width A4 Report Cards
 * and Standard Vertical CR80 PVC ID Cards without stretching.
 */
export function printIsolatedDocument(elementId: string): void {
  if (typeof window === 'undefined') return;
  const element = document.getElementById(elementId);
  if (!element) {
    window.print();
    return;
  }

  const isIdCard = elementId.includes('id-card');

  // Collect all stylesheet links and style tags from current document
  const stylesAndLinks = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
    .map((node) => node.outerHTML)
    .join('\n');

  // Clone target element
  const clone = element.cloneNode(true) as HTMLElement;
  // Remove interactive no-print elements from the clone
  clone.querySelectorAll('.no-print').forEach((el) => el.remove());

  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  iframe.style.zIndex = '-9999';
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) {
    window.print();
    return;
  }

  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>SGM Official Academic Document</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        ${stylesAndLinks}
        <style>
          @page {
            size: A4 portrait;
            margin: ${isIdCard ? '15mm auto' : '4mm'};
          }
          * {
            box-sizing: border-box !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            width: 100% !important;
            height: auto !important;
            font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
            user-select: text !important;
            -webkit-user-select: text !important;
          }
          .printable-document {
            width: ${isIdCard ? '280px' : '100%'} !important;
            max-width: ${isIdCard ? '280px' : '100%'} !important;
            margin: ${isIdCard ? '20px auto' : '0 auto'} !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            box-shadow: none !important;
          }
        </style>
      </head>
      <body>
        <div style="width: 100%; max-width: ${isIdCard ? '280px' : '100%'}; margin: 0 auto;">
          ${clone.outerHTML}
        </div>
      </body>
    </html>
  `);
  doc.close();

  setTimeout(() => {
    try {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    } catch (printErr) {
      console.error('Iframe print execution error:', printErr);
      window.print();
    }
    setTimeout(() => {
      if (document.body.contains(iframe)) {
        document.body.removeChild(iframe);
      }
    }, 2500);
  }, 400);
}
