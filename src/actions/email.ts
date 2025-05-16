'use server';

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
    } catch (err) {
        console.error('[addToAudience] error', err);

        if (err instanceof Error) {
            throw err;
        }
        throw new Error('Error desconocido al añadir a la audiencia');
    }
}
