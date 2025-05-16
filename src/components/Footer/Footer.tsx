import { getTranslations } from 'next-intl/server';
import Logo from '../Logo';

export default async function Footer() {
    const currentYear = new Date().getFullYear();
    const t = await getTranslations('Footer');

    return (
        <footer className="w-full bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center py-6 px-4 sm:px-6 lg:px-8">
                <Logo width={120} height={90} className='mb-4 sm:mb-0' />

                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
                    <div className="flex items-center space-x-1">
                        <span className="font-medium text-gray-900 dark:text-gray-100">{t('contact.phone')}:</span>
                        <a href="tel:+34123456789" className="text-blue-500 hover:text-blue-600 transition-colors">
                            +34 123 456 789
                        </a>
                    </div>
                    <div className="flex items-center space-x-1">
                        <span className="font-medium text-gray-900 dark:text-gray-100">Email:</span>
                        <a href="mailto:team@emyux.com" className="text-blue-500 hover:text-blue-600 transition-colors">
                            team@emyux.com
                        </a>
                    </div>
                </div>

                <div className="mt-4 sm:mt-0 text-center sm:text-right">
                    <p className="text-base text-gray-900 dark:text-white">
                        &copy; {currentYear} Emyux. {t('copyright')}
                    </p>
                </div>
            </div>
        </footer>
    );
}