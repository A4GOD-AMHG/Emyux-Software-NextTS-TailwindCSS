import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

const TestimonialsCarousel = dynamic(
    () => import('@/components/TestimonialsCarousel'),
)

export default function TestimonialsSection() {
    const t = useTranslations('TestimonialsSection');
    const testimonials = t.raw('testimonials');

    return (
        <section className="dark:bg-gray-950 w-full bg-white py-16">
            <div className="container relative mx-auto px-4 h-140 sm:h-100">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-500">
                    {t('title')}
                </h2>

                <div id="testimonials-viewport" className="overflow-hidden">
                    <div className="flex">
                        {Object.keys(testimonials).map((key) => (
                            <div
                                key={key}
                                className="relative flex-0 min-w-full w-full h-140 sm:h-100"
                            >
                                <div className="max-w-3xl mx-auto p-6">
                                    <div className="bg-broken-gray dark:bg-gray-900 rounded-xl shadow-lg p-8">
                                        <div className="flex items-center mb-6">
                                            <div className="w-16 flex-shrink-0 aspect-square rounded-full overflow-hidden border-2 border-blue-600">
                                                <Image
                                                    src={testimonials[key].avatar}
                                                    alt={testimonials[key].name}
                                                    width={80}
                                                    height={80}
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="ml-4 flex-1 min-w-0">
                                                <h3 className="text-gray-800 dark:text-white text-xl font-bold truncate">
                                                    {testimonials[key].name}
                                                </h3>
                                                <p className="text-gray-800 dark:text-white truncate">
                                                    {testimonials[key].role}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-gray-800 dark:text-white italic mb-4">
                                            {testimonials[key].quote}
                                        </p>
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className={`w-6 h-6 text-blue-500`}
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <TestimonialsCarousel containerId="testimonials-viewport" />
            </div>
        </section>
    )
}