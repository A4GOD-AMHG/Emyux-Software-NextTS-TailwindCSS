'use client'

import { locales } from "@/i18n/config"
import LocaleSwitcherSelect from "./locale-switcher-select"
import { useLocale, useTranslations } from 'next-intl'

export default function LocaleSwitcher() {
    const t = useTranslations('LocaleSwitcher');
    const locale = useLocale();

    return (
        <LocaleSwitcherSelect label={t('label')} defaultLocale={locale}>
            {locales.map((loc) => (
                <option key={loc}
                    className={`dark:text-gray-900 cursor-pointer ${loc === locale
                        ? 'text-gray-900 bg-white dark:text-white dark:bg-gray-900'
                        : 'text-gray-900 bg-white dark:text-white dark:bg-gray-900 hover:bg-gray-800 hover:dark:bg-gray-200'
                        }`}
                    title={loc}
                    value={loc}>
                    {t(`locale.${loc}`).toUpperCase()}
                </option>
            ))}
        </LocaleSwitcherSelect>
    )
}