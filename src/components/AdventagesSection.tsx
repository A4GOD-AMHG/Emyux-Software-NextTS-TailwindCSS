'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiCloudLightning } from 'react-icons/fi';
import ScrollToContactButton from './ScrollToContact';

export default function AdvantagesSection() {
    const t = useTranslations('AdvantagesSection');
    const systemAdvantages = t.raw('system');
    const aiAdvantages = t.raw('ai');

    const listItemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i: number) => ({
            opacity: 1,
            x: 0,
            transition: { delay: i * 0.1 },
        }),
    };

    return (
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Ventajas del Sistema */}
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
                    {t('title_system')}
                </h2>
                <div className="space-y-6 mb-12">
                    {Object.entries(systemAdvantages).map(([key], index) => (
                        <motion.div
                            key={key}
                            custom={index}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={listItemVariants}
                            className="flex items-start space-x-4"
                        >
                            <FiCheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1" />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                    {t(`system.${key}.subtitle`)}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {t(`system.${key}.desc`)}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
                    {t('title_ai')}
                </h2>
                <div className="space-y-6 mb-12">
                    {Object.entries(aiAdvantages).map(([key], index) => (
                        <motion.div
                            key={key}
                            custom={index}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={listItemVariants}
                            className="flex items-start space-x-4"
                        >
                            <FiCloudLightning className="h-6 w-6 text-purple-600 dark:text-purple-400 mt-1" />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                    {t(`ai.${key}.title`)}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {t(`ai.${key}.desc`)}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="flex justify-center">
                    <ScrollToContactButton>
                        {t('cta_contact')}
                    </ScrollToContactButton>
                </div>
            </div>
        </section>
    );
}
