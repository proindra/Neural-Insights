'use client';

import { useState } from 'react';
import { Download } from 'lucide-react';

interface PDFExportProps {
  title: string;
  author: string;
  date: string;
}

export default function PDFExport({ title, author, date }: PDFExportProps) {
  const [isExporting, setIsExporting] = useState(false);

  const exportToPDF = async () => {
    setIsExporting(true);
    
    try {
      const jsPDF = (await import('jspdf')).jsPDF;
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 20;
      const lineHeight = 7;
      let yPosition = margin;

      // Title page
      pdf.setFontSize(24);
      pdf.setFont('helvetica', 'bold');
      const titleLines = pdf.splitTextToSize(title, pageWidth - 2 * margin);
      pdf.text(titleLines, margin, yPosition);
      yPosition += titleLines.length * 10;
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`By ${author}`, margin, yPosition);
      yPosition += 10;
      pdf.text(date, margin, yPosition);
      yPosition += 20;
      
      // Get content
      const contentElement = document.querySelector('.post-content') as HTMLElement;
      if (contentElement) {
        const textContent = contentElement.innerText || contentElement.textContent || '';
        
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'normal');
        
        const lines = pdf.splitTextToSize(textContent, pageWidth - 2 * margin);
        
        for (let i = 0; i < lines.length; i++) {
          if (yPosition > pageHeight - margin) {
            pdf.addPage();
            yPosition = margin;
          }
          pdf.text(lines[i], margin, yPosition);
          yPosition += lineHeight;
        }
      }
      
      // Footer on last page
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'italic');
      pdf.text('ML Mondays | Neural Hive', margin, pageHeight - 10);

      pdf.save(`${title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={exportToPDF}
      disabled={isExporting}
      className="pdf-export-btn"
      title="Save as PDF"
    >
      <Download size={18} />
      {isExporting ? 'Generating...' : 'Save as PDF'}
    </button>
  );
}