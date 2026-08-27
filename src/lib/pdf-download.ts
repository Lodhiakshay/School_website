import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Downloads any DOM element as a high-resolution PDF directly to the user's device.
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
    // Render element to high-res canvas (scale: 2.5 = 300 DPI clarity)
    const canvas = await html2canvas(element, {
      scale: 2.5,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 1200, // standard desktop width for pristine printable rendering
    });

    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF({
      orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pageHeight;
    }

    const finalFileName = fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`;
    pdf.save(finalFileName);
    return true;
  } catch (err) {
    console.error('Error generating PDF:', err);
    return false;
  }
}

/**
 * Downloads any DOM element as a high-res PNG image.
 */
export async function downloadElementAsImage(elementId: string, fileName: string = 'document.png'): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  const element = document.getElementById(elementId);
  if (!element) return false;

  try {
    const canvas = await html2canvas(element, {
      scale: 2.5,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
    });

    const link = document.createElement('a');
    link.download = fileName.endsWith('.png') ? fileName : `${fileName}.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
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
 */
export function printIsolatedDocument(elementId: string): void {
  if (typeof window === 'undefined') return;
  const element = document.getElementById(elementId);
  if (!element) {
    window.print();
    return;
  }

  // Create clean printable iframe
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

  // Clone document and copy all styles
  const cloned = element.cloneNode(true) as HTMLElement;
  cloned.style.maxWidth = '100%';
  cloned.style.margin = '0 auto';
  cloned.style.boxShadow = 'none';

  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Sarswati Gyan Mandir ERP Document</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          body { margin: 0; padding: 12px; font-family: system-ui, -apple-system, sans-serif; background: #fff; }
          @page { size: auto; margin: 10mm; }
        </style>
      </head>
      <body>
        ${cloned.outerHTML}
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
    }, 1000);
  }, 500);
}

