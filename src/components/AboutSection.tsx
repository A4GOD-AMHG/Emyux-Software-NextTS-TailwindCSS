'use client'

import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

const team = [
    { name: 'Manzana', role: 'CEO Provisional' },
    { name: 'Banano', role: 'CTO Provisional' },
    { name: 'Cereza', role: 'Lead Developer Provisional' },
    { name: 'Durazno', role: 'UX Designer Provisional' },
];

export default function AboutSection() {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, align: 'center' },
        [Autoplay({ delay: 5000 })]
    );
    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);
    const onSelect = useCallback(() => setSelectedIndex(emblaApi?.selectedScrollSnap() || 0), [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        return () => {
            emblaApi.off('select', onSelect);
        }
    }, [emblaApi, onSelect]);

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 mb-12">
            {/* About Us Intro */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto text-center mb-16"
            >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    Conoce a quienes impulsan tu éxito
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                    Nuestro equipo de expertos está listo para llevar tu proyecto al siguiente nivel. Cada miembro aporta pasión, experiencia y un enfoque personalizado.
                </p>
            </motion.div>

            <div className="embla__viewport relative" ref={emblaRef}>
                <div className="embla__container flex gap-6">
                    {team.map((member, index) => {
                        const isActive = index === selectedIndex;
                        const baseClasses = isActive
                            ? 'flex-[0_0_80%] sm:flex-[0_0_60%] md:flex-[0_0_40%]'
                            : 'flex-[0_0_60%] sm:flex-[0_0_45%] md:flex-[0_0_30%]';
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0.5, scale: 0.9 }}
                                animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0.4, scale: 0.8 }}
                                transition={{ duration: 0.5 }}
                                className={`${baseClasses} min-w-0 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg flex flex-col items-center text-center`}
                            >
                                <div className="w-32 h-32 mb-6 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 animate-pulse" />
                                <h4 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                                    {member.name}
                                </h4>
                                <p className="text-gray-600 dark:text-gray-300 mt-2">
                                    {member.role}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

                <button
                    title="Previous"
                    onClick={() => scrollTo(selectedIndex - 1)}
                    disabled={!emblaApi}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md"
                >
                    <FiChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                </button>
                <button
                    title="Next"
                    onClick={() => scrollTo(selectedIndex + 1)}
                    disabled={!emblaApi}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md"
                >
                    <FiChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                </button>
            </div>
        </section>
    );
}
