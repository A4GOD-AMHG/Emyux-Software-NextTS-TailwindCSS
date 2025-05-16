'use client'

import { ChangeEvent, ReactNode, useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { FiChevronDown } from "react-icons/fi";

type Props = {
    children: ReactNode
    defaultLocale: string
    label: string
}

export default function LocaleSwitcherSelect({ children, defaultLocale, label }: Props) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();

    const handleLocaleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const nextLocale = e.target.value
        startTransition(() => {
            router.replace({ pathname }, { locale: nextLocale })
        })
    }

    return (
        <label className={`relative text-gray-900 dark:text-gray-200 ${isPending && 'transition-opacity [&:disabled]:opacity-30'}`}>
            <p className="sr-only">{label}</p>
            <select
                title={label}
                className="inline-flex h-10 w-16 appearance-none cursor-pointer bg-transparent py-2 pl-2 pr-6 border-1 border-gray-900 dark:border-gray-200 dark:bg-gray-800/20 backdrop-blur-sm hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                defaultValue={defaultLocale}
                onChange={handleLocaleChange}
                disabled={isPending}
            >
                {children}
            </select>
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
                <FiChevronDown className="w-5 h-5 text-gray-900 dark:text-white" />
            </span>
        </label>
    )
}
