'use client'

import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { FiStar } from 'react-icons/fi';

type Testimonial = {
    quote: string
    name: string
    role: string
    avatar: string
}


const testimonials: Testimonial[] = [
    {
        quote: "Lo mejor de Jose sin duda es la atención. Las automatizaciones es un mundo complejo, tener a alguien que ante cualquier error ese mismo día se pone a solventarlo, sea un martes, día de reyes o un domingo por la tarde, me permite centrarme en areas más creativas de mi negocio y avanzar más rápido sin tener que preocuparme por la viabilidad de soluciones tecnológicas.",
        name: "Niall Wilde",
        role: "CEO Estrategias.io",
        avatar: "/images/testimonials/testimonial1.avif"
    },
    {
        quote: "José y el equipo de Emyux realizan un trabajo fantástico. Están siempre detrás de mi proyecto proponiendo cosas nuevas para escalar.",
        name: "Vicente Montes",
        role: "CEO ReseteaT",
        avatar: "/images/testimonials/testimonial2.avif"
    },
    {
        quote: "Muy satisfecho con su servicio. Cumplieron todas mis expectativas y gracias a ellos estoy llevando de una forma mas ordenada mi negocio",
        name: "Ruscarparts",
        role: "Dueño de negocio",
        avatar: "/images/testimonials/testimonial3.avif"
    },
    {
        quote: "Fantástico trabajo. José y el equipo de Emyux fueron muy atentos y precisos con mis tareas de automatización contables. Además, me ayudaron con la parte de marketing y posicionamiento digital. A día de hoy, todavía sigo trabajando con ellos.",
        name: "Jesús Sepúlveda",
        role: "Agente Inmobiliario",
        avatar: "/images/testimonials/testimonial4.avif"
    },
    {
        quote: "Estoy muy satisfecho con el servicio de Emyux. Automatizaron toda mi atención al cliente (lo cual me robaba mucho tiempo), tanto por llamadas como por email y Whatsapp. También, me ayudaron con la parte analítica de redes sociales y, además, desarrollaron una plataforma muy eficiente para la gestión de los alumnos de mi escuela.",
        name: "Fco Javier Templado",
        role: "CEO Escuela Javier T",
        avatar: "/images/testimonials/testimonial5.avif"
    }
];


const StarRating = () => (
    <div className="flex gap-1 mb-4 text-blue-500 dark:text-blue-400">
        {[...Array(5)].map((_, i) => (
            <FiStar key={i} className="w-5 h-5 fill-current" />
        ))}
    </div>
)

export default function TestimonialsCarousel() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 5000 })
    ]);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const scrollTo = useCallback((index: number) => {
        emblaApi?.scrollTo(index)
    }, [emblaApi])

    const onSelect = useCallback(() => {
        setSelectedIndex(emblaApi?.selectedScrollSnap() || 0)
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        return () => {
            emblaApi.off('select', onSelect);
        };
    }, [emblaApi, onSelect]);

    return (
        <section className="py-20 rounded-3xl my-12 overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-8 md:mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        Lo que dicen <span className="text-blue-600 dark:text-blue-400">nuestros clientes</span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
                        Empresas que ya están transformando su negocio
                    </p>
                </motion.div>

                <div className="embla relative" ref={emblaRef}>
                    <div className="embla__container flex">
                        {testimonials.map((testimonial, index) => (
                            <div className="embla__slide flex-[0_0_90%] sm:flex-[0_0_60%] lg:flex-[0_0_40%] min-w-0 px-2 sm:px-4" key={index}>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className={`
                                        bg-white dark:bg-gray-800/80 p-6 md:p-8 rounded-xl shadow-sm backdrop-blur-sm 
                                        border border-gray-100 dark:border-gray-700 h-full flex flex-col min-h-[350px]
                                        transition-transform duration-300
                                        ${selectedIndex === index
                                            ? 'opacity-100 scale-100'
                                            : 'opacity-50 scale-90'}
                                    `}
                                >
                                    <div className="flex flex-col items-center h-full">
                                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-100 dark:border-blue-900/50 mb-6">
                                            <Image
                                                src={testimonial.avatar}
                                                alt={testimonial.name}
                                                width={64}
                                                height={64}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>

                                        <StarRating />

                                        <p className="text-gray-900 dark:text-gray-100 line-clamp-5 text-center text-sm md:text-base leading-relaxed mb-4 flex-1">
                                            {testimonial.quote}
                                        </p>

                                        <div className="mt-auto text-center">
                                            <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                                                {testimonial.name}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                                                {testimonial.role}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center gap-2 mt-6 md:mt-8">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => scrollTo(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === selectedIndex
                                    ? 'bg-blue-600 dark:bg-blue-400 w-6'
                                    : 'bg-gray-300 dark:bg-gray-600'}`}
                                aria-label={`Testimonio ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}