'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface Step {
    key: string;
    number: string;
    title: string;
    desc: string;
}

export default function TimelineSection() {
    const t = useTranslations('TimelineSection');
    const steps = t.raw('steps') as Step[];

    return (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-8">
                    {t('heading')}
                </h2>
                <div className="relative">
                    <div className="absolute left-1/2 transform -translate-x-0.5 bg-gray-300 dark:bg-gray-700 h-full w-0.5" />

                    <div className="space-y-8">
                        {steps.map((step, idx) => (
                            <motion.div
                                key={step.key}
                                className={`relative flex items-start w-full ${idx % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                            >
                                <div className="w-full sm:w-2/3 px-4">
                                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
                                        <span className="inline-block text-lg font-bold text-blue-600 dark:text-blue-400">
                                            {step.number}
                                        </span>
                                        <h3 className="mt-1 text-xl font-semibold text-gray-900 dark:text-gray-100">
                                            {step.title}
                                        </h3>
                                        <p className="mt-1 text-gray-700 dark:text-gray-300 text-sm">
                                            {step.desc}
                                        </p>
                                    </div>
                                </div>
                                <div className="absolute left-1/2 transform -translate-x-1/2 bg-blue-600 dark:bg-blue-400 rounded-full w-3 h-3 mt-2" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
