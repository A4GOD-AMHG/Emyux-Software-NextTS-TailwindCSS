'use client';

import { InlineWidget, useCalendlyEventListener } from 'react-calendly';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { useRouter } from '@/i18n/navigation';
import { useEffect, useState } from 'react';

export default function CalendlyPage() {
    const { theme, systemTheme } = useTheme();
    const tC = useTranslations('CalendlyPage');
    const router = useRouter();

    const [contact, setContact] = useState<{ name: string; email: string; phone: string } | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [schedulingComplete, setSchedulingComplete] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('contactFormData');
        if (saved) setContact(JSON.parse(saved));
    }, []);

    const currentTheme = theme === 'system' ? systemTheme : theme;
    const [iframeKey, setIframeKey] = useState(0);

    useEffect(() => {
        setIframeKey(prev => prev + 1);
    }, [currentTheme]);

    useCalendlyEventListener({
        onEventScheduled: async () => {
            if (!contact) return;
            try {
                setSchedulingComplete(true);
                setTimeout(() => router.push('/thank-you'), 5000);
            } catch {
                alert(tC('calendly_error'));
            }
        },
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    if (!contact) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-gray-600 dark:text-gray-400">{tC('loading_message')}</p>
                </div>
            </div>
        );
    }

    return (
        <main className="w-full max-w-7xl mx-auto flex flex-col px-4 sm:px-6 lg:px-8 relative min-h-[calc(100vh-160px)]">
            {isLoading && (
                <div className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-10 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            {tC('loading_calendly')}
                        </p>
                    </div>
                </div>
            )}

            {schedulingComplete && (
                <div className="fixed inset-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm z-10 flex items-center justify-center">
                    <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                        <div className="animate-bounce mb-4 text-4xl">🎉</div>
                        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                            {tC('scheduling_complete')}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            {tC('redirect_message')}
                        </p>
                    </div>
                </div>
            )}

            <section className="flex-1 w-full relative h-[800px] sm:h-[600px] lg:h-[700px] xl:h-[800px]">
                <div className="absolute inset-0 h-full w-full">
                    <InlineWidget
                        url="https://calendly.com/team-emyux/consultoria-emyux"
                        key={iframeKey}
                        styles={{
                            width: '100%',
                            height: '100%',
                            border: 'none',
                            backgroundColor: 'transparent'
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
                        }}
                    />
                </div>
            </section>
        </main>
    );
}
