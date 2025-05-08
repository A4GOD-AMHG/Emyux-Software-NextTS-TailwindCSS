import { Link } from '@/i18n/navigation';
import LocaleSwitcher from '@/i18n/locale-switcher';
// import { useTranslations } from 'next-intl';
import Logo from '@/components/Logo';
import ThemeToggle from '@/theme/toggle-theme';

export default async function Header() {
    // const t = useTranslations('Header')

    return (
        <header className="sticky top-0 bg-white shadow z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/">
                    <Logo width={200} height={100} />
                </Link>

                <div className="flex items-center gap-4">
                    <LocaleSwitcher />
                    <ThemeToggle />
                    <button title='Botón' className="focus:outline-none">

                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>

                    </button>
                </div>
            </div>
        </header>
    )
}