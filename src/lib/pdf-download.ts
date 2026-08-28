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
 * Uses a standardized 360px CR80 staging canvas with generous borders to prevent side/bottom clipping.
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

  // Create CR80 standard staging canvas (360px width)
  const badgeWrapper = document.createElement('div');
  badgeWrapper.style.position = 'fixed';
  badgeWrapper.style.top = '0';
  badgeWrapper.style.left = '0';
  badgeWrapper.style.width = '360px';
  badgeWrapper.style.minWidth = '360px';
  badgeWrapper.style.maxWidth = '360px';
  badgeWrapper.style.zIndex = '-9999';
  badgeWrapper.style.opacity = '1';
  badgeWrapper.style.pointerEvents = 'none';
  badgeWrapper.style.backgroundColor = '#ffffff';
  badgeWrapper.style.boxSizing = 'border-box';
  badgeWrapper.style.padding = '0';

  const clone = element.cloneNode(true) as HTMLElement;
  clone.style.width = '100%';
  clone.style.maxWidth = '100%';
  clone.style.margin = '0';
  clone.style.transform = 'none';

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
 * Clean isolated print of a document without website chrome, topbars, or sidebars.
 * Renders the exact native browser snapshot into an isolated print iframe.
 */
export async function printIsolatedDocument(elementId: string): Promise<void> {
  if (typeof window === 'undefined') return;
  const element = document.getElementById(elementId);
  if (!element) {
    window.print();
    return;
  }

  try {
    const dataUrl = await toPng(element, {
      quality: 1.0,
      pixelRatio: 3.0,
      backgroundColor: '#ffffff',
      cacheBust: true,
      filter: (node: HTMLElement) => {
        if (node.classList && node.classList.contains('no-print')) {
          return false;
        }
        return true;
      },
    });

    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) {
      window.print();
      return;
    }

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Official Institutional Document</title>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <style>
            @page {
              size: portrait;
              margin: 6mm;
            }
            * {
              box-sizing: border-box;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            html, body {
              margin: 0;
              padding: 0;
              background: #ffffff;
              width: 100%;
              height: auto;
            }
            .document-image {
              width: 100%;
              max-width: 100%;
              height: auto;
              display: block;
              margin: 0 auto;
              page-break-inside: avoid;
            }
          </style>
        </head>
        <body>
          <img class="document-image" src="${dataUrl}" alt="Official Document" />
        </body>
      </html>
    `);
    doc.close();

    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
      setTimeout(() => {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, 1500);
    }, 400);
  } catch (err) {
    console.error('Print rendering error:', err);
    window.print();
  }
}
