'use client'

import { locales } from "@/i18n/config"
import LocaleSwitcherSelect from "./locale-switcher-select"
import { useLocale, useTranslations } from 'next-intl'

export default function LocaleSwitcher() {
    const t = useTranslations('LocaleSwitcher');
    const locale = useLocale();

    return (
        <LocaleSwitcherSelect label={t('label')} defaultLocale={locale}>
            {locales.map((locale) => (
                <option key={locale} title={locale} value={locale}>
                    {t(`locale.${locale}`)}
                </option>
            ))}
        </LocaleSwitcherSelect>
    )
}