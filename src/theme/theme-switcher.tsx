"use client"

import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export const dynamic = 'force-dynamic';

export default function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    const t = useTranslations("ThemeSwitcher");

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent" />
        );
    }

    return (
        <button
            type="button"
            className="w-10 h-10 cursor-pointer flex items-center justify-center rounded-lg border py-2 border-gray-900 dark:border-gray-200 bg-white/50 dark:bg-gray-800/20 backdrop-blur-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
            title={t('title')}
            aria-label={t('aria')}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            {theme === "dark" ? (
                <FiSun className="w-4.5 h-4.5 text-gray-900 dark:text-gray-200" />
            ) : (
                <FiMoon className="w-4.5 h-4.5 text-gray-900 dark:text-gray-200" />
            )}
        </button>
    );
}