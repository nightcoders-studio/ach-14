import { describe, it, expect, vi, beforeEach } from 'vitest';
import { sendWhatsAppMessage } from '@/lib/whatsapp';
import prisma from '@/lib/prisma';

// Mock dependensi Prisma
vi.mock('@/lib/prisma', () => ({
  default: {
    systemSetting: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
    },
    citizen: {
      findMany: vi.fn(),
    },
    alertLog: {
      createMany: vi.fn(),
    },
  },
}));

describe('Modul 02: WhatsApp Formatter (Unit Test)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('seharusnya membersihkan format nomor HP 08 menjadi 628 dengan benar sesuai standar internasional', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });

    const mockSystemSetting = prisma.systemSetting.findMany as any;
    mockSystemSetting.mockResolvedValueOnce([
      { key: 'EVOLUTION_API_URL', value: 'http://mock-evo' },
      { key: 'EVOLUTION_INSTANCE_NAME', value: 'mock-instance' },
      { key: 'EVOLUTION_GLOBAL_KEY', value: 'mock-api-key' }
    ]);

    const targetNumbers = ['081234567890', '+6289876543210', '0852-1111-2222'];
    const result = await sendWhatsAppMessage(targetNumbers, 'Test Message');

    expect(result.success).toBe(true);
    expect(global.fetch).toHaveBeenCalledTimes(3);
    
    const call1 = (global.fetch as any).mock.calls[0][1];
    expect(JSON.parse(call1.body).number).toBe('6281234567890');

    const call2 = (global.fetch as any).mock.calls[1][1];
    expect(JSON.parse(call2.body).number).toBe('6289876543210');

    const call3 = (global.fetch as any).mock.calls[2][1];
    expect(JSON.parse(call3.body).number).toBe('6285211112222');
  });
});
