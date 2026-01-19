import PDFDocument from "pdfkit";
import QRCode from "qrcode";
import type { Item } from "~/components/ItemCard";

export async function generateItemsPDF(items: Item[], baseUrl: string) {
  const doc = new PDFDocument({ margin: 40 });
  const qrCodeUrl = `${baseUrl}`;

  // Generate QR code
  const qrImage = await QRCode.toDataURL(qrCodeUrl);

  // Add title
  doc.fontSize(28).font("Helvetica-Bold").text("My Stuff", { align: "center" });
  doc
    .fontSize(12)
    .font("Helvetica")
    .text("Items List & Catalog", { align: "center" });
  doc.moveDown(1.5);

  // Draw a box around QR code
  const boxSize = 180;
  const boxX = (doc.page.width - boxSize) / 2;
  const boxY = doc.y;

  doc.rect(boxX, boxY, boxSize, boxSize).stroke();
  doc.moveDown(0.5);

  // Add QR code in the box
  const qrBuffer = Buffer.from(qrImage.split(",")[1], "base64");
  doc.image(qrBuffer, boxX + 15, boxY + 15, { width: boxSize - 30 });

  doc.y = boxY + boxSize + 10;
  doc.moveDown(0.5);

  // Add scan instruction
  doc
    .fontSize(10)
    .font("Helvetica-Oblique")
    .text("Scan QR code to view items online", { align: "center" });
  doc.moveDown(1.5);

  // Add separator line
  doc
    .moveTo(40, doc.y)
    .lineTo(doc.page.width - 40, doc.y)
    .stroke();
  doc.moveDown(1);

  // Add items list header
  doc.fontSize(14).font("Helvetica-Bold").text("Items", { underline: true });
  doc.moveDown(0.8);

  // Add items with better formatting
  items.forEach((item, index) => {
    doc
      .fontSize(11)
      .font("Helvetica-Bold")
      .text(`${index + 1}. ${item.description}`, {
        continued: false,
      });
    doc
      .fontSize(10)
      .font("Helvetica")
      .text(`Price: $${item.price.toFixed(2)}`, { color: "#333" });
    doc.moveDown(0.6);
  });

  // Add footer
  doc.moveDown(1);
  doc
    .moveTo(40, doc.y)
    .lineTo(doc.page.width - 40, doc.y)
    .stroke();
  doc
    .fontSize(9)
    .font("Helvetica")
    .text(
      `Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`,
      {
        align: "center",
        color: "#666",
      }
    );

  return doc;
}
