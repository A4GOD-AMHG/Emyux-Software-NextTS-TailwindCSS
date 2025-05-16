import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { Sora } from "next/font/google";
import { ReactNode } from 'react';
import ScrollToTop from '@/components/ScrollToTop';
import ThemeProvider from '@/theme/theme-provider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { locales } from '@/i18n/config';
import "@/app/styles/globals.css"

const sora = Sora({
  subsets: ["latin"],
});


type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Omit<Props, 'children'>) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "RootLayout" });

  return { title: t('title'), description: t('description'), };
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${sora.className} overflow-y-scroll scrollbar-hide scroll-smooth`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen bg-white text-black dark:bg-gray-950 dark:text-white transition-colors duration-300">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
            <Footer />
            <ScrollToTop />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}