'use client'

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FiZap, FiLink, FiClock, FiHeart } from 'react-icons/fi';

export default function ProblemsSection() {
    const t = useTranslations('ProblemsSection');
    const problems = t.raw('problems');

    const icons = [
        { key: 'zap', element: <FiZap className="w-8 h-8 text-purple-500 dark:text-purple-400" /> },
        { key: 'link', element: <FiLink className="w-8 h-8 text-blue-500 dark:text-blue-400" /> },
        { key: 'clock', element: <FiClock className="w-8 h-8 text-green-500 dark:text-green-400" /> },
        { key: 'heart', element: <FiHeart className="w-8 h-8 text-red-500 dark:text-red-400" /> }
    ];

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto text-center mb-12"
            >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    {t('title')}
                </h2>
                <p className="text-xl text-gray-800 dark:text-white">
                    {t('subtext1')}
                </p>
                <p className="text-xl text-gray-800 dark:text-white mt-4">
                    {t('subtext2')}
                </p>
                <p className="text-xl text-blue-600 dark:text-blue-400 font-semibold mt-6">
                    {t('highlight')}
                </p>
            </motion.div>

            <div className="max-w-5xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {Object.keys(problems).map((key, i) => (
                    <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="bg-broken-gray dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col items-center text-center"
                    >
                        <div className="mb-4" key={icons[i].key}>{icons[i].element}</div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            {problems[key].title}
                        </h3>
                        <p className="text-normal mt-2 text-gray-800 dark:text-white">
                            {problems[key].desc}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}