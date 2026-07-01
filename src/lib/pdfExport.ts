import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { formatINR } from "./whatsappShare";
import { robotoBase64, robotoBoldBase64 } from "./pdfFonts";

export interface PDFPayload {
  title: string;
  brand: "LIC" | "UTI" | "Star Health";
  inputs: { label: string; value: string | number }[];
  results: { label: string; value: string | number; highlight?: boolean }[];
  disclaimer: string;
}

const NAVY: [number, number, number] = [17, 43, 92];
const GOLD: [number, number, number] = [201, 162, 39];

export function downloadCalculatorPDF(p: PDFPayload) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  doc.addFileToVFS("Roboto-Regular.ttf", robotoBase64);
  doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
  doc.addFileToVFS("Roboto-Bold.ttf", robotoBoldBase64);
  doc.addFont("Roboto-Bold.ttf", "Roboto", "bold");
  const pageW = doc.internal.pageSize.getWidth();

  // Header bar
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, pageW, 80, "F");
  doc.setFillColor(...GOLD);
  doc.rect(0, 80, pageW, 4, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("JC.HGF.PA.SARAVANAN", 40, 34);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Financial Consultant  |  HRD Trainer", 40, 50);
  doc.text("LIC  |  UTI Mutual Fund  |  Star Health Insurance", 40, 64);

  doc.setFontSize(9);
  doc.text("+91 7010105335", pageW - 40, 34, { align: "right" });
  doc.text("+91 9842362462 (WhatsApp)", pageW - 40, 48, { align: "right" });
  doc.text("pasaravananlic@gmail.com", pageW - 40, 62, { align: "right" });

  // Title
  doc.setTextColor(...NAVY);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(p.title, 40, 118);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(90, 90, 90);
  doc.text(`Powered by ${p.brand}  |  Generated ${new Date().toLocaleDateString("en-IN")}`, 40, 134);

  // Inputs table
  autoTable(doc, {
    startY: 150,
    head: [["Your Inputs", "Value"]],
    body: p.inputs.map((i) => [i.label, String(i.value)]),
    theme: "grid",
    headStyles: { fillColor: NAVY, textColor: 255, fontStyle: "bold", font: "Roboto" },
    styles: { fontSize: 10, cellPadding: 6, font: "Roboto" },
    columnStyles: { 0: { cellWidth: 220 } },
  });

  // Results table
  const startY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 20;
  autoTable(doc, {
    startY,
    head: [["Result", "Amount"]],
    body: p.results.map((r) => [
      r.label,
      typeof r.value === "number" ? `₹ ${formatINR(r.value)}` : String(r.value),
    ]),
    theme: "grid",
    headStyles: { fillColor: GOLD, textColor: NAVY, fontStyle: "bold", font: "Roboto" },
    styles: { fontSize: 11, cellPadding: 7, font: "Roboto" },
    columnStyles: { 0: { cellWidth: 220 }, 1: { fontStyle: "bold", font: "Roboto", textColor: NAVY as unknown as number } },
    didParseCell: (data) => {
      const row = p.results[data.row.index];
      if (row?.highlight && data.section === "body") {
        data.cell.styles.fillColor = [255, 249, 224];
        data.cell.styles.fontStyle = "bold";
      }
    },
  });

  const disclY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 24;
  doc.setFont("Roboto", "normal");
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  const wrapped = doc.splitTextToSize(p.disclaimer, pageW - 80);
  doc.text(wrapped, 40, disclY);

  // Footer
  const pageH = doc.internal.pageSize.getHeight();
  doc.setFillColor(...NAVY);
  doc.rect(0, pageH - 42, pageW, 42, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Book a free consultation today", 40, pageH - 22);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("Atchaya, LIC Premium Point, Karaikal – 609602", pageW - 40, pageH - 22, {
    align: "right",
  });

  doc.save(`${p.brand.replace(/\s+/g, "-")}-${Date.now()}.pdf`);
}