'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiArrowRight } from 'react-icons/fi';
import ContactModal from '@/components/ContactModal';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function HeroSection() {
    const t = useTranslations('HeroSection');

    return (
        <section className="min-h-[90vh] flex flex-col md:flex-row items-center justify-between gap-8 mb-16 sm:mb-0 md:gap-12 pt-10 md:pt-0 px-4 sm:px-6 lg:px-8">
            <div className="md:w-1/2 z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
                        {t('title_part1')}{' '}
                        <span className="text-blue-600 dark:text-blue-400">
                            {t('title_part2')}
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8">
                        <span className="font-semibold text-blue-600 dark:text-blue-400">
                            {t('subtext_highlight')}
                        </span>{' '}
                        {t('subtext_rest')}
                    </p>

                    <div className="flex flex-row gap-4 mb-12">
                        <ContactModal
                            trigger={
                                <button
                                    title="Toggle"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors dark:bg-blue-500 dark:hover:bg-blue-600"
                                >
                                    {t('cta_contact')}
                                </button>
                            }
                        />

                        <Link href="https://emyux.com/portfolio" passHref>
                            <p className="flex items-center gap-2 px-6 py-3 text-gradient-to-r text-gray-900 dark:text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
                                {t('cta_portfolio')} <FiArrowRight />
                            </p>
                        </Link>

                    </div>

                    <div className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-lg backdrop-blur-sm border border-gray-100 dark:border-gray-700">
                        <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
                            {t('achievements_title')}
                        </h3>
                        <ul className="space-y-2">
                            {Object.values(t.raw('achievements')).map((item, index) => (
                                <li key={index} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                    <FiArrowRight className="text-green-500 w-5 h-5" /> {item as string}
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            </div>

            <div className="md:w-1/2 relative w-full h-96 md:h-[500px] lg:h-[600px]">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative w-full h-full rounded-[40px] overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/40 to-purple-500/70 dark:from-blue-900/20 dark:to-purple-900/20 backdrop-blur-sm">
                        <Image
                            src="/images/bg.jpg"
                            alt="Desarrollo de software"
                            fill
                            className="object-cover scale-110"
                            style={{ maskImage: 'radial-gradient(circle at center, black 80%, transparent 100%)' }}
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-400 dark:to-gray-950 rounded-[40px]"></div>
                </motion.div>
                <div className="absolute -bottom-10 left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-gray-950 to-transparent"></div>
            </div>
        </section>
    );
}
