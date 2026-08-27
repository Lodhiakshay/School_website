import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Downloads any DOM element as a high-resolution, perfectly proportioned PDF directly to user device.
 * Uses off-screen staging to prevent mobile screen clipping or squishing.
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

  // Create an off-screen staging container at standard desktop print width (794px = A4 96 DPI)
  const stage = document.createElement('div');
  stage.style.position = 'fixed';
  stage.style.left = '-99999px';
  stage.style.top = '0';
  stage.style.width = '794px';
  stage.style.minWidth = '794px';
  stage.style.maxWidth = '794px';
  stage.style.background = '#ffffff';
  stage.style.padding = '0';
  stage.style.margin = '0';
  stage.style.zIndex = '-99999';
  stage.style.boxSizing = 'border-box';

  // Clone element into stage
  const clone = element.cloneNode(true) as HTMLElement;
  clone.style.width = '100%';
  clone.style.maxWidth = '100%';
  clone.style.margin = '0';
  clone.style.boxShadow = 'none';
  clone.style.overflow = 'visible';

  // Expand any clipped text or table overflows inside clone
  const overflowElements = clone.querySelectorAll('*');
  overflowElements.forEach((el) => {
    const htmlEl = el as HTMLElement;
    if (htmlEl.style) {
      if (htmlEl.classList.contains('truncate')) {
        htmlEl.style.whiteSpace = 'normal';
        htmlEl.style.overflow = 'visible';
      }
      if (htmlEl.classList.contains('overflow-x-auto') || htmlEl.classList.contains('overflow-hidden')) {
        htmlEl.style.overflow = 'visible';
      }
    }
  });

  stage.appendChild(clone);
  document.body.appendChild(stage);

  try {
    // Render off-screen clone with 300 DPI clarity (scale: 2.5)
    const canvas = await html2canvas(clone, {
      scale: 2.5,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 1024,
    });

    // Remove staging element
    document.body.removeChild(stage);

    const imgData = canvas.toDataURL('image/png', 1.0);
    const contentWidthMm = 210; // Standard A4 width in mm
    const contentHeightMm = (canvas.height * contentWidthMm) / canvas.width;

    // If document is a 1-page certificate, report card, or receipt, fit page height proportionally
    // to eliminate vast empty blank white space on mobile viewers.
    const isSinglePageDoc = contentHeightMm <= 297;
    const pageFormat: [number, number] | string = isSinglePageDoc
      ? [contentWidthMm, Math.max(contentHeightMm, 120)]
      : 'a4';

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: pageFormat,
    });

    if (isSinglePageDoc) {
      pdf.addImage(imgData, 'PNG', 0, 0, contentWidthMm, contentHeightMm, undefined, 'SLOW');
    } else {
      let heightLeft = contentHeightMm;
      let position = 0;
      const a4PageHeight = 297;

      pdf.addImage(imgData, 'PNG', 0, position, contentWidthMm, contentHeightMm, undefined, 'SLOW');
      heightLeft -= a4PageHeight;

      while (heightLeft > 0) {
        position = heightLeft - contentHeightMm;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, contentWidthMm, contentHeightMm, undefined, 'SLOW');
        heightLeft -= a4PageHeight;
      }
    }

    const finalFileName = fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`;
    pdf.save(finalFileName);
    return true;
  } catch (err) {
    if (document.body.contains(stage)) {
      document.body.removeChild(stage);
    }
    console.error('Error generating PDF:', err);
    return false;
  }
}

/**
 * Downloads ID Badges / Cards as Ultra High-Definition CR80 PNG images.
 * @param elementId DOM ID of the ID badge card
 * @param fileName Name of the downloaded image file (e.g. 'Faculty_ID_Dr_Ramesh.png')
 */
export async function downloadElementAsImage(elementId: string, fileName: string = 'badge.png'): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id "${elementId}" not found for image export.`);
    return false;
  }

  // Create an off-screen staging container at standard crisp badge width (480px)
  const stage = document.createElement('div');
  stage.style.position = 'fixed';
  stage.style.left = '-99999px';
  stage.style.top = '0';
  stage.style.width = '340px';
  stage.style.minWidth = '340px';
  stage.style.maxWidth = '340px';
  stage.style.background = '#ffffff';
  stage.style.padding = '0';
  stage.style.margin = '0';
  stage.style.zIndex = '-99999';

  const clone = element.cloneNode(true) as HTMLElement;
  clone.style.width = '100%';
  clone.style.maxWidth = '100%';
  clone.style.margin = '0';
  clone.style.boxShadow = 'none';

  stage.appendChild(clone);
  document.body.appendChild(stage);

  try {
    const canvas = await html2canvas(clone, {
      scale: 3.0, // 300+ DPI ultra crisp image
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
    });

    document.body.removeChild(stage);

    const link = document.createElement('a');
    link.download = fileName.endsWith('.png') ? fileName : `${fileName}.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch (err) {
    if (document.body.contains(stage)) {
      document.body.removeChild(stage);
    }
    console.error('Error downloading image:', err);
    return false;
  }
}

/**
 * Clean isolated print of a document without website chrome, topbars, or sidebars.
 * Uses high-resolution canvas snapshot to ensure 100% CSS style fidelity on mobile and desktop printers without page splitting.
 */
export async function printIsolatedDocument(elementId: string): Promise<void> {
  if (typeof window === 'undefined') return;
  const element = document.getElementById(elementId);
  if (!element) {
    window.print();
    return;
  }

  // Create an off-screen staging container at standard desktop print width (794px = A4 96 DPI)
  const stage = document.createElement('div');
  stage.style.position = 'fixed';
  stage.style.left = '-99999px';
  stage.style.top = '0';
  stage.style.width = '794px';
  stage.style.minWidth = '794px';
  stage.style.maxWidth = '794px';
  stage.style.background = '#ffffff';
  stage.style.padding = '0';
  stage.style.margin = '0';
  stage.style.zIndex = '-99999';
  stage.style.boxSizing = 'border-box';

  const clone = element.cloneNode(true) as HTMLElement;
  clone.style.width = '100%';
  clone.style.maxWidth = '100%';
  clone.style.margin = '0';
  clone.style.boxShadow = 'none';
  clone.style.overflow = 'visible';

  // Expand any clipped text or table overflows inside clone
  const overflowElements = clone.querySelectorAll('*');
  overflowElements.forEach((el) => {
    const htmlEl = el as HTMLElement;
    if (htmlEl.style) {
      if (htmlEl.classList.contains('truncate')) {
        htmlEl.style.whiteSpace = 'normal';
        htmlEl.style.overflow = 'visible';
      }
      if (htmlEl.classList.contains('overflow-x-auto') || htmlEl.classList.contains('overflow-hidden')) {
        htmlEl.style.overflow = 'visible';
      }
    }
  });

  stage.appendChild(clone);
  document.body.appendChild(stage);

  try {
    const canvas = await html2canvas(clone, {
      scale: 2.5, // 300 DPI sharpness
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 1024,
    });

    document.body.removeChild(stage);

    const imgData = canvas.toDataURL('image/png', 1.0);

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
          <img class="document-image" src="${imgData}" alt="Official Document" />
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
    if (document.body.contains(stage)) {
      document.body.removeChild(stage);
    }
    console.error('Print rendering error:', err);
    window.print();
  }
}
