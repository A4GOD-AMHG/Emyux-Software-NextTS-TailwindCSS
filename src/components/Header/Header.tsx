import { Link } from '@/i18n/navigation';
import LocaleSwitcher from '@/i18n/locale-switcher';
import Logo from '@/components/Logo';
import ThemeSwitcher from '@/theme/theme-switcher';

export default async function Header() {

    return (
        <header className="sticky top-0 bg-broken-gray/50 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/">
                    <Logo width={200} height={100} />
                </Link>

                <div className="flex items-center gap-2">
                    <LocaleSwitcher />
                    <ThemeSwitcher />
                </div>
            </div>
        </header>
    )
}