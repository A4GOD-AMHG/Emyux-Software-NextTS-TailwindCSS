'use client'

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function ThankYouPage() {
    const t = useTranslations('ThankYouPage');

    return (
        <div className="flex-1 min-h-[calc(100vh-160px)] flex items-center justify-center bg-gradient-to-b from-purple-50/50 to-blue-50/50 dark:from-gray-900 dark:to-gray-950 px-4 py-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50"
            >
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100"
                >
                    {t('title')}
                </motion.h1>

                <motion.p
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed"
                >
                    {t('message')}
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <Link href="/" legacyBehavior>
                        <a className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg font-semibold hover:from-gray-700 hover:to-gray-800 transition-transform transform hover:scale-105">
                            {t('back_home')}
                        </a>
                    </Link>

                    <Link href="https://emyux.com/" target="_blank" legacyBehavior>
                        <a className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-transform transform hover:scale-105">
                            {t('button')}
                        </a>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}

// import Link from 'next/link';
// import { useTranslations } from 'next-intl';
//
// export default function ThankYouPage() {
//     const t = useTranslations('ThankYouPage');
//
//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
//             <div className="max-w-md text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow">
//                 <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
//                     {t('title')}
//                 </h1>
//                 <p className="text-gray-700 dark:text-gray-300 mb-6">
//                     {t('message')}
//                 </p>
//                 <Link href="https://emyux.com/" target="_blank">
//                     <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold">
//                         {t('button')}
//                     </button>
//                 </Link>
//             </div>
//         </div>
//     );
// }
