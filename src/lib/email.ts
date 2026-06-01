import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmergencyEmail(title: string, message: string, severity: string, source: string) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.log("🛠️ [MOCK EMAIL] Sistem dalam mode simulasi, email tidak dikirim.");
      return { success: true, simulated: true };
    }

    const { data, error } = await resend.emails.send({
      // Ganti dengan domain yang sudah diverifikasi di Resend
      // Saat masa percobaan, Resend hanya mengizinkan pengiriman ke email sendiri
      from: "Alert Hub <onboarding@resend.dev>",
      to: ["geuchik@gampong.com"], // Ganti dengan email penerima sungguhan nanti
      subject: `[${severity}] Peringatan Darurat: ${title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
          <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid ${severity === 'CRITICAL' ? '#ef4444' : '#f59e0b'};">
            <h1 style="color: ${severity === 'CRITICAL' ? '#ef4444' : '#f59e0b'}; margin: 0;">GAMPONG ALERT HUB</h1>
            <p style="color: #64748b; margin-top: 5px;">Pemberitahuan Instansi Resmi</p>
          </div>
          
          <div style="padding: 20px 0;">
            <h2 style="color: #0f172a; margin-top: 0;">${title}</h2>
            <p style="color: #334155; line-height: 1.6; font-size: 16px;">
              ${message}
            </p>
            
            <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin-top: 20px;">
              <p style="margin: 0 0 10px 0;"><strong>Tingkat Bahaya:</strong> <span style="color: ${severity === 'CRITICAL' ? '#ef4444' : '#f59e0b'};">${severity}</span></p>
              <p style="margin: 0;"><strong>Sumber Info:</strong> ${source}</p>
            </div>
          </div>
          
          <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #94a3b8; font-size: 12px;">
            <p>Pesan ini dihasilkan secara otomatis oleh Sistem Cerdas Gampong Alert Hub.</p>
            <p>Harap segera mengambil tindakan penanggulangan sesuai SOP Gampong.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send emergency email:", error);
    return { success: false, error };
  }
}
