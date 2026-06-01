import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // 1. Ambil Data dari Database
    const reports = await prisma.report.findMany({
      include: { citizen: true },
      orderBy: { createdAt: "desc" }
    });

    // 2. Susun HTML Template
    const rowsHtml = reports.map((r, index) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${index + 1}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">
          <strong>${r.type}</strong><br/>
          <span style="font-size: 12px; color: #64748b;">${r.location}</span>
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${r.citizen.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${r.status}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${new Date(r.createdAt).toLocaleDateString('id-ID')}</td>
      </tr>
    `).join("");

    const html = `
      <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #0f172a; padding: 20px; }
            h1 { color: #1e293b; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; text-align: left; }
            th { background-color: #f8fafc; padding: 12px 10px; border-bottom: 2px solid #cbd5e1; }
            .footer { margin-top: 50px; text-align: right; font-size: 14px; color: #64748b; }
          </style>
        </head>
        <body>
          <h1>Laporan Resmi Gampong Alert Hub</h1>
          <p>Rekapitulasi Insiden & Keluhan Warga</p>
          <p><strong>Tanggal Dicetak:</strong> ${new Date().toLocaleDateString('id-ID')}</p>
          
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Insiden & Lokasi</th>
                <th>Pelapor</th>
                <th>Status</th>
                <th>Tanggal</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>

          <div class="footer">
            <p>Digenerate secara otomatis oleh Gampong Alert Hub System</p>
          </div>
        </body>
      </html>
    `;

    // 3. Jalankan Puppeteer (Local / Headless)
    const browser = await puppeteer.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    });
    
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'load' });
    
    // 4. Generate PDF buffer
    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
      printBackground: true,
    });
    
    await browser.close();

    // 5. Kembalikan PDF ke Client
    return new NextResponse(pdfBuffer as any, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Laporan_Gampong.pdf"',
      },
    });

  } catch (error) {
    console.error("Puppeteer PDF Error:", error);
    return NextResponse.json({ error: "Gagal membuat PDF" }, { status: 500 });
  }
}
