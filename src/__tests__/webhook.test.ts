import { describe, it, expect, vi } from 'vitest';
import { POST } from '@/app/api/webhooks/reports/route';
import prisma from '@/lib/prisma';

// Mock dependensi Prisma
vi.mock('@/lib/prisma', () => ({
  default: {
    citizen: {
      findUnique: vi.fn(),
    },
    report: {
      create: vi.fn(),
    },
  },
}));

// Karena rute Next.js menggunakan Request object standar
function createRequest(body: any, auth: string) {
  return new Request('http://localhost/api/webhooks/reports', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': auth,
    },
    body: JSON.stringify(body),
  });
}

describe('Modul 03: Parser Laporan 2-Arah Webhook (Unit Test)', () => {
  it('harus menolak request jika otorisasi salah', async () => {
    const req = createRequest({}, 'Bearer salah-token');
    const res = await POST(req);
    const data = await res.json();
    
    expect(res.status).toBe(401);
    expect(data.success).toBe(false);
  });

  it('harus mengembalikan error jika payload tidak lengkap', async () => {
    // Kurang parameter 'location'
    const req = createRequest({ phone: '0812', type: 'KEBAKARAN', description: 'Api besar' }, 'Bearer gampong_alert_webhook_2026_xyz');
    const res = await POST(req);
    const data = await res.json();
    
    expect(res.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.error).toContain('Payload tidak lengkap');
  });

  it('harus sukses membuat laporan jika data valid dan warga terdaftar', async () => {
    const mockCitizen = prisma.citizen.findUnique as any;
    mockCitizen.mockResolvedValueOnce({ id: 'citizen-123', phone: '628123456789' });

    const mockReportCreate = prisma.report.create as any;
    mockReportCreate.mockResolvedValueOnce({
      id: 'report-abc',
      type: 'KEBAKARAN',
      status: 'PENDING',
    });

    const req = createRequest({ 
      phone: '08123456789', // Input dari warga
      type: 'KEBAKARAN', 
      description: 'Api besar di pasar',
      location: 'Pasar Inpres'
    }, 'Bearer gampong_alert_webhook_2026_xyz');

    const res = await POST(req);
    const data = await res.json();
    
    expect(res.status).toBe(201);
    expect(data.success).toBe(true);
    expect(data.data.id).toBe('report-abc');

    // Pastikan Prisma create dipanggil dengan parameter yang benar (nomor diformat saat dicari)
    expect(mockCitizen).toHaveBeenCalledWith({ where: { phone: '628123456789' } });
    expect(mockReportCreate).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        type: 'KEBAKARAN',
        location: 'Pasar Inpres',
        citizenId: 'citizen-123'
      })
    }));
  });
});
