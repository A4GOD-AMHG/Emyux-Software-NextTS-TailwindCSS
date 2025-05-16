import Image from 'next/image';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import ScrollToContactButton from '../ScrollToContact';

const AnimatedContent = dynamic(
    () => import('@/components/Hero/AnimatedContent'),
);

export default function HeroSection() {
    const t = useTranslations('HeroSection');

    return (
        <section className="min-h-[90vh] flex flex-col md:flex-row items-center justify-between gap-8 mb-16 sm:mb-0 md:gap-12 pt-10 md:pt-0 ">
            <div className="md:w-1/2 z-10">
                <AnimatedContent>
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
                        {t('title_solution_part1')}{' '}<br />
                        <span className="text-blue-600 dark:text-blue-400">
                            {t('title_solution_part2')}
                        </span>
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-purple-50/80 dark:bg-purple-900/20 p-4 rounded-xl border border-purple-200 dark:border-purple-800">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-purple-600 dark:text-purple-400 text-lg">✖</span>
                                <h3 className="font-semibold text-purple-800 dark:text-purple-200">
                                    {t('generic_software_title')}
                                </h3>
                            </div>
                            <ul className="space-y-2">
                                {Object.values(t.raw('generic_problems')).map((item, index) => (
                                    <li key={index} className="text-purple-700 dark:text-purple-300 text-sm">
                                        <span className='mr-2'>•</span> {item as string}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-blue-50/80 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-blue-600 dark:text-blue-400 text-lg">✓</span>
                                <h3 className="font-semibold text-blue-800 dark:text-blue-200">
                                    {t('our_solution_title')}
                                </h3>
                            </div>
                            <ul className="space-y-2">
                                {Object.values(t.raw('our_solutions')).map((item, index) => (
                                    <li key={index} className="text-blue-700 dark:text-blue-300 text-sm">
                                        <span className='mr-2'>•</span> {item as string}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="space-y-6 flex flex-col items-center">
                        <ScrollToContactButton>
                            {t('cta_contact')}
                        </ScrollToContactButton>

                        <div className="p-4 text-center">
                            <p className="text-gray-900 dark:text-gray-300 font-medium text-base sm:text-xl">
                                <span className="text-blue-600 dark:text-blue-400">{t('stat_value')}</span>{' '}
                                {t('stat_text')}
                            </p>
                        </div>
                    </div>
                </AnimatedContent>
            </div>

            <div className="md:w-1/2 relative w-full h-96 md:h-[500px] lg:h-[600px]">
                <div className="relative w-full h-full rounded-[40px] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/40 to-purple-500/70 dark:from-blue-900/20 dark:to-purple-900/20 backdrop-blur-sm">
                        <Image
                            src="/images/bg.jpg"
                            alt="Sistemas personalizados"
                            fill
                            className="object-cover scale-110"
                            style={{ maskImage: 'radial-gradient(circle at center, black 80%, transparent 100%)' }}
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-30% via-white/20 to-90% to-gray-700 dark:via-gray-900/50 dark:to-gray-950 rounded-[40px]"></div>
                    <div className="absolute bottom-6 left-6 right-6 bg-white/90 dark:bg-gray-800/90 p-4 rounded-xl backdrop-blur-sm border border-gray-200 dark:border-gray-700">
                        <p className="text-center text-gray-900 dark:text-gray-200 font-medium italic">
                            {t('image_caption')}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}