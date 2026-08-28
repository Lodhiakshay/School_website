import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

/**
 * Downloads any DOM element as a high-resolution, pixel-perfect PDF.
 * Uses native browser SVG <foreignObject> rendering (html-to-image) directly on the live element.
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

  try {
    const dataUrl = await toPng(element, {
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

    const img = new Image();
    img.src = dataUrl;
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    const contentWidthMm = 210; // Standard A4 width in mm
    const contentHeightMm = (img.height * contentWidthMm) / img.width;

    const isSinglePage = contentHeightMm <= 297;
    const pageFormat: [number, number] | string = isSinglePage
      ? [contentWidthMm, Math.max(contentHeightMm, 120)]
      : 'a4';

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: pageFormat,
    });

    if (isSinglePage) {
      pdf.addImage(dataUrl, 'PNG', 0, 0, contentWidthMm, contentHeightMm, undefined, 'SLOW');
    } else {
      let heightLeft = contentHeightMm;
      let position = 0;
      const a4PageHeight = 297;

      pdf.addImage(dataUrl, 'PNG', 0, position, contentWidthMm, contentHeightMm, undefined, 'SLOW');
      heightLeft -= a4PageHeight;

      while (heightLeft > 0) {
        position = heightLeft - contentHeightMm;
        pdf.addPage();
        pdf.addImage(dataUrl, 'PNG', 0, position, contentWidthMm, contentHeightMm, undefined, 'SLOW');
        heightLeft -= a4PageHeight;
      }
    }

    const finalFileName = fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`;
    pdf.save(finalFileName);
    return true;
  } catch (err) {
    console.error('Error generating PDF:', err);
    printIsolatedDocument(elementId);
    return false;
  }
}

/**
 * Downloads ID Badges / Cards as Ultra High-Definition CR80 PNG images.
 * Uses native browser rendering to ensure 100% exact match with the on-screen card.
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

    const link = document.createElement('a');
    link.download = fileName.endsWith('.png') ? fileName : `${fileName}.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch (err) {
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
