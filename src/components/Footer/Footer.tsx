import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function Footer() {
    const currentYear = new Date().getFullYear();
    const t = await getTranslations('Footer');

    return (
        <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">{t('contact.title')}</h3>
                        <address className="not-italic">
                            <p className="text-gray-800 dark:text-gray-100 mb-3">
                                <span className="font-medium text-gray-900 dark:text-gray-100">Emyux Software</span><br />
                                Av. Tecnológica 1234, Piso 8<br />
                                Barcelona, 08025<br />
                                España
                            </p>
                            <p className="text-gray-800 dark:text-gray-100 mb-3">
                                <span className="font-medium text-gray-900 dark:text-gray-100">{t('contact.phone')}:</span> +34 123 456 789
                            </p>
                            <a
                                href="mailto:team@emyux.com"
                                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
                            >
                                team@emyux.com
                            </a>
                        </address>
                    </div>

                    <div>
                        <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">{t('legal.title')}</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href={`https://emyux.com/${t('locale')}/privacy-policy`}
                                    className="text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                                    target="_blank"
                                >
                                    {t('legal.privacy')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`https://emyux.com/${t('locale')}/terms`}
                                    className="text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                                    target="_blank"
                                >
                                    {t('legal.terms')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`https://emyux.com/${t('locale')}/cookies`}
                                    className="text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                                    target="_blank"
                                >
                                    {t('legal.cookies')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="md:text-right">
                        <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">{t('quote.title')}</h3>
                        <blockquote className="text-gray-800 dark:text-gray-100 italic mb-4">
                            {t('quote.quote')}
                        </blockquote>
                        <p className="text-gray-800 dark:text-gray-100">
                            {t('quote.subtitle')}
                        </p>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-900 dark:border-gray-100 text-center">
                    <p className="text-gray-800 dark:text-gray-100 text-md">
                        &copy; {currentYear} Emyux Software. {t('copyright')}
                    </p>
                </div>
            </div>
        </footer>
    )
}