'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import ScrollToContactButton from './ScrollToContact';

export default function ControlSection() {
    const t = useTranslations('ControlSection');

    const focusPoints = [
        { key: 'optimize', icon: '💡', title: t('optimize.title'), desc: t('optimize.desc') },
        { key: 'proactive', icon: '🔍', title: t('proactive.title'), desc: t('proactive.desc') },
        { key: 'innovate', icon: '🚀', title: t('innovate.title'), desc: t('innovate.desc') }
    ];

    const audience = t.raw('isThisForYou');

    return (
        <section className="py-24 px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
                        {t('heading')}
                    </h2>
                    <p className="text-xl text-gray-900 dark:text-white max-w-2xl mx-auto">
                        {t('subheading')}
                    </p>
                </motion.div>

                <div className="grid gap-10 sm:grid-cols-3 mb-20">
                    {focusPoints.map((item, i) => (
                        <motion.div
                            key={item.key}
                            className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow flex flex-col"
                            initial={{ scale: 0.95, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2, duration: 0.6 }}
                        >
                            <div className="text-5xl mb-4 text-blue-500 dark:text-blue-400">
                                {item.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 flex-grow">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <div className="flex flex-col lg:flex-row gap-12 mb-20">
                    <motion.div
                        className="flex-1 bg-red-50 dark:bg-red-900/30 rounded-3xl p-8 shadow-inner"
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <h4 className="text-2xl font-semibold text-red-600 dark:text-red-400 mb-4">
                            ❌ {t('isThisForYou.noTitle')}
                        </h4>
                        <ul className="space-y-3 text-base sm:text-lg list-disc list-inside text-gray-900 dark:text-white">
                            {audience.no.map((item: string, idx: number) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        className="flex-1 bg-green-50 dark:bg-green-900/30 rounded-3xl p-8 shadow-inner"
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <h4 className="text-2xl font-semibold text-green-600 dark:text-green-400 mb-4">
                            ✅ {t('isThisForYou.yesTitle')}
                        </h4>
                        <ul className="space-y-3 text-base sm:text-lg list-disc list-inside text-gray-900 dark:text-white">
                            {audience.yes.map((item: string, idx: number) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                <div className="flex justify-center text-center">
                    <ScrollToContactButton>
                        {t('cta')}
                    </ScrollToContactButton>
                </div>
            </div>
        </section>
    );
}
