'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import * as z from 'zod';
import { addToAudience } from '@/actions/email';
import {useRouter} from "@/i18n/navigation";
import { motion } from 'framer-motion';

const createFormSchema = (t: (key: string) => string) => z.object({
    name: z.string().min(2, t('validation.name')),
    email: z.string().email(t('validation.email')),
    phone: z.string().min(7, t('validation.phone')),
});

type InitialValues = z.infer<ReturnType<typeof createFormSchema>>;

const inputAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

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
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                >
                    {t('title')}
                </motion.h2>

                <form onSubmit={onSubmit} className="space-y-8">
                    <motion.div
                        variants={inputAnimation}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                            {t('labels.name')}
                        </label>
                        <input
                            {...form.register('name')}
                            placeholder={t('labels.name')}
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-500/30 transition-all"
                        />
                        {form.formState.errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {form.formState.errors.name.message}
                            </p>
                        )}
                    </motion.div>

                    <motion.div
                        variants={inputAnimation}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                    >
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                            {t('labels.email')}
                        </label>
                        <input
                            type="email"
                            {...form.register('email')}
                            placeholder={t('labels.email')}
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-500/30 transition-all"
                        />
                        {form.formState.errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {form.formState.errors.email.message}
                            </p>
                        )}
                    </motion.div>

                    <motion.div
                        variants={inputAnimation}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                    >
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                            {t('labels.phone')}
                        </label>
                        <PhoneInput
                            international
                            defaultCountry="ES"
                            value={form.watch('phone')}
                            onChange={(value) => form.setValue('phone', value || '')}
                            className="w-full [&>input]:px-4 [&>input]:py-3 [&>input]:rounded-xl [&>input]:border-2 [&>input]:border-gray-200 [&>input]:dark:border-gray-700 [&>input]:bg-white/80 [&>input]:dark:bg-gray-800/50 [&>input]:backdrop-blur-sm focus:[&>input]:border-purple-500 focus:[&>input]:ring-2 focus:[&>input]:ring-purple-200 dark:focus:[&>input]:ring-purple-500/30 [&>input]:transition-all"
                        />
                        {form.formState.errors.phone && (
                            <p className="text-red-500 text-sm mt-1">
                                {form.formState.errors.phone.message}
                            </p>
                        )}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="pt-4 flex justify-center text-center"
                    >
                        <button
                            type="submit"
                            disabled={form.formState.isSubmitting}
                            className="w-32 h-16  rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {form.formState.isSubmitting ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="w-2 h-2 bg-white rounded-full animate-bounce" />
                                    <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-100" />
                                    <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-200" />
                                </span>
                            ) : (
                                t('next')
                            )}
                        </button>
                    </motion.div>
                </form>
            </div>
        </section>
    );
}