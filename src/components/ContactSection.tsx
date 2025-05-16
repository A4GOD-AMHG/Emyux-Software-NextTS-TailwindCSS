'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import * as z from 'zod';
import { addToAudience } from '@/actions/email';
import {useRouter} from "@/i18n/navigation";

const createFormSchema = (t: (key: string) => string) => z.object({
    name: z.string().min(2, t('validation.name')),
    email: z.string().email(t('validation.email')),
    phone: z.string().min(7, t('validation.phone')),
});

type InitialValues = z.infer<ReturnType<typeof createFormSchema>>;

const phoneInputClasses = `
    mt-2 w-full border rounded-lg px-4 py-3 
    bg-white dark:bg-gray-800 
    border-gray-300 dark:border-gray-700 
    focus:ring-2 focus:ring-purple-500 focus:border-purple-500 
    [&>.PhoneInputCountry]:flex [&>.PhoneInputCountry]:items-center
    [&>.PhoneInputCountrySelect]:ml-2 [&>.PhoneInputCountryIcon]:!w-5 [&>.PhoneInputCountryIcon]:!h-5
`;

export default function ContactSection() {
    const t = useTranslations('ContactSection');
    const router = useRouter();
    const form = useForm<InitialValues>({
        resolver: zodResolver(createFormSchema(t)),
    });

    const onSubmit = form.handleSubmit(async (data) => {
        try {
            const rawPhone = data.phone.startsWith('+')
                ? data.phone.slice(1)
                : data.phone;

            await addToAudience(data.name, data.email);
            localStorage.setItem('contactFormData', JSON.stringify({
                name:  data.name,
                email: data.email,
                phone: rawPhone,
            }));
            router.push('/quiz');
        } catch (error) {
            console.error('Error:', error);
        }
    });

    return (
        <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">
                    {t('title')}
                </h2>
                <form onSubmit={onSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium">
                            {t('labels.name')}
                        </label>
                        <input
                            {...form.register('name')}
                            placeholder={t('labels.name')}
                            className="mt-2 w-full border rounded-lg px-4 py-3 dark:bg-gray-800 dark:border-gray-700"
                        />
                        {form.formState.errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {form.formState.errors.name.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">
                            {t('labels.email')}
                        </label>
                        <input
                            type="email"
                            {...form.register('email')}
                            placeholder={t('labels.email')}
                            className="mt-2 w-full border rounded-lg px-4 py-3 dark:bg-gray-800 dark:border-gray-700"
                        />
                        {form.formState.errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {form.formState.errors.email.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">
                            {t('labels.phone')}
                        </label>
                        <PhoneInput
                            international
                            defaultCountry="ES"
                            value={form.watch('phone')}
                            onChange={(value) => form.setValue('phone', value || '')}
                            className="
                mt-2 w-full border rounded-lg px-4 py-3 bg-white dark:bg-gray-800
                border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-500
              "
                        />
                        {form.formState.errors.phone && (
                            <p className="text-red-500 text-sm mt-1">
                                {form.formState.errors.phone.message}
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition"
                    >
                        {t('next')}
                    </button>
                </form>
            </div>
        </section>
    );
}