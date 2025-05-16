import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function ThankYouPage() {
    const t = useTranslations('ThankYouPage');

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
            <div className="max-w-md text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow">
                <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                    {t('title')}
                </h1>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                    {t('message')}
                </p>
                <Link href="https://emyux.com/" target="_blank">
                    <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold">
                        {t('button')}
                    </button>
                </Link>
            </div>
        </div>
    );
}