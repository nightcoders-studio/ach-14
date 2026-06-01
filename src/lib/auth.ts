import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { magicLink } from "better-auth/plugins";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        sendResetPassword: async ({ user, url, token }: { user: any, url: string, token: string }, request?: any) => {
            if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "masukkan_resend_api_key_anda_disini") {
                await resend.emails.send({
                    from: "Gampong Alert Hub <onboarding@resend.dev>",
                    to: user.email,
                    subject: "Atur Ulang Sandi Gampong Alert Hub",
                    html: `<p>Halo ${user.name},</p><p>Silakan klik tautan berikut untuk mengatur ulang sandi Anda:</p><p><a href="${url}">${url}</a></p>`,
                });
                console.log(`[Email Sent] Reset Password URL sent to: ${user.email}`);
            } else {
                console.log("==================================================");
                console.log(`[MOCK EMAIL SENDER] Reset Password for: ${user.email}`);
                console.log(`[MOCK EMAIL SENDER] Reset URL: ${url}`);
                console.log("==================================================");
            }
        },
    },
    emailVerification: {
        sendOnSignUp: true,
        sendVerificationEmail: async ({ user, url, token }: { user: any, url: string, token: string }, request?: any) => {
            if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "masukkan_resend_api_key_anda_disini") {
                await resend.emails.send({
                    from: "Gampong Alert Hub <onboarding@resend.dev>",
                    to: user.email,
                    subject: "Verifikasi Email Gampong Alert Hub",
                    html: `<p>Halo ${user.name},</p><p>Silakan klik tautan berikut untuk memverifikasi email Anda:</p><p><a href="${url}">${url}</a></p>`,
                });
                console.log(`[Email Sent] Verification URL sent to: ${user.email}`);
            } else {
                console.log("==================================================");
                console.log(`[MOCK EMAIL SENDER] Verification Email for: ${user.email}`);
                console.log(`[MOCK EMAIL SENDER] Verification URL: ${url}`);
                console.log("==================================================");
            }
        },
    },
    plugins: [
        magicLink({
            sendMagicLink: async ({ email, token, url }: { email: string, token: string, url: string }, request?: any) => {
                if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "masukkan_resend_api_key_anda_disini") {
                    await resend.emails.send({
                        from: "Gampong Alert Hub <onboarding@resend.dev>",
                        to: email,
                        subject: "Masuk ke Gampong Alert Hub (Magic Link)",
                        html: `<p>Halo,</p><p>Klik tautan berikut untuk masuk ke akun Anda:</p><p><a href="${url}">${url}</a></p>`,
                    });
                    console.log(`[Email Sent] Magic Link URL sent to: ${email}`);
                } else {
                    console.log("==================================================");
                    console.log(`[MOCK EMAIL SENDER] Magic Link for: ${email}`);
                    console.log(`[MOCK EMAIL SENDER] Magic Link URL: ${url}`);
                    console.log("==================================================");
                }
            },
        }),
    ]
});
