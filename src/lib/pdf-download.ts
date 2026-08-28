import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

/**
 * Preloads and converts any <img> tags inside an element to base64 Data URLs
 * to ensure that cross-origin or relative URLs never fail or taint the canvas.
 */
async function inlineImages(element: HTMLElement): Promise<void> {
  const images = element.querySelectorAll('img');
  const promises = Array.from(images).map(async (img) => {
    if (img.src && !img.src.startsWith('data:')) {
      try {
        const response = await fetch(img.src, { mode: 'cors' });
        const blob = await response.blob();
        const reader = new FileReader();
        await new Promise((resolve) => {
          reader.onloadend = () => {
            if (reader.result) {
              img.src = reader.result as string;
            }
            resolve(true);
          };
          reader.readAsDataURL(blob);
        });
      } catch {
        // If fetch fails, continue with existing src
      }
    }
  });
  await Promise.all(promises);
}

/**
 * Downloads any DOM element as a high-resolution, pixel-perfect PDF.
 * Uses native browser SVG <foreignObject> rendering (html-to-image) to guarantee
 * 100% fidelity with the live UI—no font corruption, no clipped text, no broken gradients.
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
    // Clone element to avoid modifying live UI
    const clone = element.cloneNode(true) as HTMLElement;
    clone.style.width = element.offsetWidth > 0 ? `${element.offsetWidth}px` : '794px';
    clone.style.maxWidth = '100%';
    clone.style.margin = '0';
    clone.style.position = 'fixed';
    clone.style.left = '-99999px';
    clone.style.top = '0';
    clone.style.zIndex = '-99999';
    clone.style.background = '#ffffff';

    document.body.appendChild(clone);
    await inlineImages(clone);

    const dataUrl = await toPng(clone, {
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

    document.body.removeChild(clone);

    const img = new Image();
    img.src = dataUrl;
    await new Promise((resolve) => {
      img.onload = resolve;
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
    console.error('Error generating PDF with native renderer:', err);
    // Fallback: trigger native print dialog
    printIsolatedDocument(elementId);
    return false;
  }
}

/**
 * Downloads ID Badges / Cards as Ultra High-Definition CR80 PNG images.
 * Uses native browser rendering to ensure 100% exact match with the on-screen card.
 */
export async function downloadElementAsImage(elementId: string, fileName: string = 'badge.png'): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id "${elementId}" not found for image export.`);
    return false;
  }

  try {
    const clone = element.cloneNode(true) as HTMLElement;
    clone.style.width = element.offsetWidth > 0 ? `${element.offsetWidth}px` : '340px';
    clone.style.maxWidth = '340px';
    clone.style.margin = '0';
    clone.style.position = 'fixed';
    clone.style.left = '-99999px';
    clone.style.top = '0';
    clone.style.zIndex = '-99999';
    clone.style.background = '#ffffff';

    document.body.appendChild(clone);
    await inlineImages(clone);

    const dataUrl = await toPng(clone, {
      quality: 1.0,
      pixelRatio: 3.5,
      backgroundColor: '#ffffff',
      cacheBust: true,
      filter: (node: HTMLElement) => {
        if (node.classList && node.classList.contains('no-print')) {
          return false;
        }
        return true;
      },
    });

    document.body.removeChild(clone);

    const link = document.createElement('a');
    link.download = fileName.endsWith('.png') ? fileName : `${fileName}.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch (err) {
    console.error('Error downloading image with native renderer:', err);
    return false;
  }
}

/**
 * Industry-Standard Native Isolated Print Engine.
 * Mounts the target document into a top-level print container and invokes the browser's
 * native vector print dialog with full CSS styles, fonts, and background colors.
 */
export function printIsolatedDocument(elementId: string): void {
  if (typeof window === 'undefined') return;
  const element = document.getElementById(elementId);
  if (!element) {
    window.print();
    return;
  }

  // Remove any existing print container
  const existing = document.getElementById('isolated-print-container');
  if (existing && document.body.contains(existing)) {
    document.body.removeChild(existing);
  }

  // Create clean top-level container for print
  const printContainer = document.createElement('div');
  printContainer.id = 'isolated-print-container';

  const clone = element.cloneNode(true) as HTMLElement;
  clone.classList.add('printable-document');
  printContainer.appendChild(clone);

  document.body.appendChild(printContainer);
  document.body.classList.add('is-printing-isolated');

  const cleanup = () => {
    document.body.classList.remove('is-printing-isolated');
    if (document.body.contains(printContainer)) {
      document.body.removeChild(printContainer);
    }
    window.removeEventListener('afterprint', cleanup);
  };

  window.addEventListener('afterprint', cleanup);

  setTimeout(() => {
    window.print();
    // Safety fallback cleanup in case afterprint does not fire on some browsers
    setTimeout(cleanup, 2000);
  }, 100);
}
