'use client';

import { InlineWidget, useCalendlyEventListener } from 'react-calendly';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { useRouter } from '@/i18n/navigation';
import { sendAppointmentEmail } from '@/actions/email';
import { useEffect, useState } from 'react';

export default function CalendlyPage() {
    const { theme, systemTheme } = useTheme();
    const tC = useTranslations('CalendlyPage');
    const tM = useTranslations('Common');
    const router = useRouter();

    const [contact, setContact] = useState<{ name: string; email: string; phone: string } | null>(null);
    useEffect(() => {
        const saved = localStorage.getItem('contactFormData');
        if (saved) setContact(JSON.parse(saved));
    }, []);

    const [selectedDateTime, setSelectedDateTime] = useState<string>('');
    const currentTheme = theme === 'system' ? systemTheme : theme;
    const [iframeKey, setIframeKey] = useState(0);

    useEffect(() => {
        setIframeKey(prev => prev + 1);
    }, [currentTheme]);

    useCalendlyEventListener({
        onDateAndTimeSelected: (e) => {
            const dt = (e.data.payload as any).date_time as string;
            setSelectedDateTime(dt);
        },
        onEventScheduled: async (e) => {
            if (!contact) return;
            try {
                const iso = selectedDateTime || new Date().toISOString();
                const datetime = new Date(iso).toLocaleString();
                await sendAppointmentEmail({
                    to:   contact.email,
                    name: contact.name,
                    datetime,
                });
                setTimeout(() => router.push('/thank-you'), 1500);
            } catch {
                alert(tC('calendly_error'));
            }
        },
    });

    if (!contact) {
        return <div className="flex items-center justify-center h-screen">{tC('loading_message')}</div>;
    }

    const baseUrl = `https://calendly.com/team-emyux/consultoria-emyux`;

    return (
        <main className="w-full max-w-7xl mx-auto flex flex-col grow px-4 sm:px-6 lg:px-8">
        <section className="flex-1 w-full relative">
            <div className="absolute inset-0">
            <InlineWidget
                url={baseUrl}
                key={iframeKey}
                styles={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                }}
                pageSettings={{
                    backgroundColor: currentTheme === 'dark' ? '030712' : 'ffffff',
                    textColor: currentTheme === 'dark' ? 'ffffff' : '030712',
                    hideEventTypeDetails: false,
                    hideLandingPageDetails: true,
                    hideGdprBanner: true,
                }}
                prefill={{
                    name: contact.name,
                    email: contact.email,
                    smsReminderNumber: contact.phone,
                }}/>
            </div>
        </section>
    </main>);
}
