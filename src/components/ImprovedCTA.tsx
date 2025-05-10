'use client'

import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';
import ContactModal from '@/components/ContactModal';
import { useTranslations } from 'next-intl';

export default function ImprovedCTA() {
    const t = useTranslations('ImprovedCTA');
    const features = t.raw('features');

    return (
        <section className="py-16 mb-12 px-4 sm:px-6 lg:px-8 relative">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-700 to-indigo-900 opacity-80 backdrop-blur-sm"></div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative z-10 text-center max-w-xl mx-auto"
            >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                    {t('title_part1')}{' '}
                    <span className="text-yellow-300">{t('title_highlight')}</span>
                    {t('title_part2')}
                </h2>
                <p className="text-lg sm:text-xl text-indigo-100 mb-8">
                    {t('subtext')}
                </p>

                <ContactModal
                    trigger={
                        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-indigo-900 font-semibold rounded-lg transition-colors">
                            {t('cta')}
                        </button>
                    }
                />

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    {Object.values(features).map((item, i) => (
                        <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white backdrop-blur-sm">
                            <FiCheckCircle className="w-4 h-4 text-yellow-300" />
                            {item as string}
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
