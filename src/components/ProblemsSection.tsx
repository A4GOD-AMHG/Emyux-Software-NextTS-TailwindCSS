'use client'

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FiZap, FiLink, FiClock, FiHeart } from 'react-icons/fi';

export default function ProblemsSection() {
    const t = useTranslations('ProblemsSection');
    const problems = t.raw('problems');

    const icons = [
        { key: 'zap', element: <FiZap className="w-6 h-6" /> },
        { key: 'link', element: <FiLink className="w-6 h-6" /> },
        { key: 'clock', element: <FiClock className="w-6 h-6" /> },
        { key: 'heart', element: <FiHeart className="w-6 h-6" /> }
    ];

    const colors = [
        'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
        'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
        'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
        'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
    ];

    return (
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto text-center mb-12 md:mb-16"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                        {t('title')}
                    </h2>
                    <div className="space-y-4">
                        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                            {t('subtext1')}
                        </p>
                        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                            {t('subtext2')}
                        </p>
                    </div>
                    <motion.p
                        className="text-xl md:text-2xl dark:text-blue-400 font-bold mt-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                        animate={{
                            backgroundPosition: ['0% 50%', '100% 50%'],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            repeatType: 'reverse',
                            ease: 'linear'
                        }}
                        style={{
                            backgroundSize: '200% 200%',
                        }}
                    >
                        {t('highlight')}
                    </motion.p>
                </motion.div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {Object.keys(problems).map((key, i) => (
                        <motion.div
                            key={key}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group"
                        >
                            <div className="h-full bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center group-hover:border-blue-400 dark:group-hover:border-blue-600">
                                <div className={`mb-5 p-4 rounded-full ${colors[i]} group-hover:scale-110 transition-transform`}>
                                    {icons[i].element}
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                                    {problems[key].title}
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 flex-grow">
                                    {problems[key].desc}
                                </p>
                                <div className="mt-4 w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}