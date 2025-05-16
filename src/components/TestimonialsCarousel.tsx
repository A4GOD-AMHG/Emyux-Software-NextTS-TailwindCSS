'use client'

import { useEffect, useState } from 'react';
import type { EmblaCarouselType } from 'embla-carousel';

interface TestimonialsCarouselProps {
    containerId: string
}

export default function TestimonialsCarousel({ containerId }: TestimonialsCarouselProps) {
    const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | null>(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [slideCount, setSlideCount] = useState(0);

    useEffect(() => {
        let embla: EmblaCarouselType | null = null

        const initializeCarousel = async () => {
            const viewport = document.getElementById(containerId)
            if (!viewport) return

            const EmblaCarousel = (await import('embla-carousel')).default
            const Autoplay = (await import('embla-carousel-autoplay')).default

            embla = EmblaCarousel(
                viewport,
                {
                    loop: true,
                    containScroll: 'trimSnaps',
                    dragFree: false
                },
                [Autoplay({ delay: 7000, stopOnInteraction: false })]
            )

            setEmblaApi(embla)
            setSlideCount(embla.scrollSnapList().length)
            setSelectedIndex(embla.selectedScrollSnap())

            embla.on('select', () => {
                setSelectedIndex(embla?.selectedScrollSnap() || 0)
            })
        }

        initializeCarousel()

        return () => {
            if (embla) embla.destroy()
        }
    }, [containerId])

    return (
        <div className="absolute inset-x-0 top-16 sm:top-15 mx-auto">
            <div className="flex justify-center z-50 gap-2">
                {Array.from({ length: slideCount }).map((_, idx) => (
                    <button
                        key={idx}
                        className={`w-3 h-3 sm:w-5 sm:h-5 rounded-full cursor-pointer ${selectedIndex === idx ? 'bg-blue-500' : 'bg-gray-300'
                            }`}
                        onClick={() => emblaApi?.scrollTo(idx)}
                        title={`Ir al testimonio ${idx + 1}`}
                        aria-label={`Ir al testimonio ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}