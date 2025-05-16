'use server';

import ConfirmEmailTemplate from '@/components/emailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function addToAudience(name: string, email: string) {
    console.log('[addToAudience] start', { name, email });
    try {
        const result = await resend.contacts.create({
            email,
            firstName: name,
            unsubscribed: false,
            audienceId: process.env.RESEND_AUDIENCE_ID!,
        });
        console.log('[addToAudience] success', result);
        return result;
    } catch (err: any) {
        console.error('[addToAudience] error', err);
        throw err;
    }
}

export async function sendAppointmentEmail(params: {
    to: string;
    name: string;
    datetime: string;
}) {
    const { to, name, datetime } = params;
    console.log('[sendAppointmentEmail] sending to', to);
    try {
        const mail = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL!,
            to,
            subject: `Tu cita está confirmada – ${datetime}`,
            react: ConfirmEmailTemplate({ name, datetime }),
        });
        console.log('[sendAppointmentEmail] sent', mail);
        return mail;
    } catch (err: any) {
        console.error('[sendAppointmentEmail] error', err);
        throw err;
    }
}
