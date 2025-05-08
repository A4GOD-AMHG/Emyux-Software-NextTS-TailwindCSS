import { useTranslations } from "next-intl";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const t = useTranslations('Footer');

    return (
        <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Contacto</h3>
                        <a
                            href="mailto:team@emyux.com"
                            className="text-blue-600 mt-4 cursor-pointer hover:text-purple-600 text-base md:text-lg"
                        >
                            team@emyux.com
                        </a>
                        <p className="mt-2 font-normal text-gray-800 sm:max-w-[300px] px-4 sm:px-0 text-base md:text-lg">
                            {t('address')}
                        </p>
                        <p className="mt-2 font-normal text-gray-800 sm:max-w-[300px] px-4 sm:px-0 text-base md:text-lg">
                            {t('location')}
                        </p>
                    </div>
                </div>
                <p className="text-gray-800 text-center py-4 md:py-8 font-medium text-base md:text-xl">
                    {t('copyright', { year: currentYear })}
                </p>
            </div>
        </footer>
    )
}