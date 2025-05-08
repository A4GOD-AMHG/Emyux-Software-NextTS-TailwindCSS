"use client";

import ContactModal from '@/components/ContactModal';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiArrowRight, FiCode, FiCpu, FiDatabase, FiCheckCircle } from 'react-icons/fi';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useState } from 'react';

const HeroImage = () => (
    <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative w-full h-96 md:h-[500px] lg:h-[600px]"
    >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-900/20 dark:to-purple-900/20 rounded-[40px] overflow-hidden backdrop-blur-sm">
            <Image
                src="/images/bg.jpg"
                alt="Desarrollo de software"
                fill
                className="object-cover scale-110"
                style={{ maskImage: 'radial-gradient(circle at center, black 60%, transparent 100%)' }}
                priority
            />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-gray-950"></div>
    </motion.div>
);

const services = [
    {
        icon: <FiCode className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
        title: "Software que Genera Resultados",
        description: "No vendemos código, vendemos soluciones que aumentan tus ingresos y reducen costos. Sistemas diseñados exclusivamente para hacer crecer TU negocio.",
        benefits: ["+30% eficiencia", "ROI medible", "Escalable"]
    },
    {
        icon: <FiCpu className="w-8 h-8 text-purple-500 dark:text-purple-400" />,
        title: "Automatización que Transforma",
        description: "Elimina el trabajo repetitivo de tu equipo con sistemas inteligentes que trabajan 24/7 sin errores. Recupera hasta 15 horas semanales por empleado.",
        benefits: ["0 errores humanos", "Procesos 5x más rápidos", "Integración inmediata"]
    },
    {
        icon: <FiDatabase className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
        title: "Sistemas que Impulsan",
        description: "ERP/CRM que realmente se adaptan a tus procesos. Olvídate de sistemas genéricos que no cumplen. Control total sobre cada aspecto de tu operación.",
        benefits: ["Ventas +40%", "Clientes satisfechos", "Toma decisiones con datos"]
    }
];

const testimonials = [
    {
        quote: "Incrementamos nuestra productividad en un 200% con su sistema. El equipo de Emyux entendió exactamente lo que necesitábamos.",
        name: "Carlos Méndez",
        role: "CEO de TechSolutions Inc.",
        avatar: "/images/avatar1.jpg"
    },
    {
        quote: "La mejor inversión que hemos hecho en tecnología. Nuestros procesos ahora son 3 veces más rápidos y con cero errores.",
        name: "Ana Rodríguez",
        role: "Directora de Operaciones, Global Enterprises",
        avatar: "/images/avatar2.jpg"
    },
    {
        quote: "De tener sistemas obsoletos a contar con tecnología de punta en solo 2 meses. Los resultados han superado nuestras expectativas.",
        name: "Javier López",
        role: "CTO de Innovatech",
        avatar: "/images/avatar3.jpg"
    },
    {
        quote: "El sistema personalizado que desarrollaron nos permitió escalar nuestras operaciones a nivel internacional sin problemas.",
        name: "María González",
        role: "Directora de Expansión, NextLevel",
        avatar: "/images/avatar4.jpg"
    },
    {
        quote: "Soporte excepcional y soluciones que realmente generan ROI. Hemos recuperado nuestra inversión en solo 4 meses.",
        name: "David Fernández",
        role: "Gerente Financiero, GrowthCorp",
        avatar: "/images/avatar5.jpg"
    }
];

export default function Home() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 8000 })
    ]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollTo = useCallback((index: number) => {
        if (!emblaApi) return;
        emblaApi.scrollTo(index);
    }, [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        return () => {
            emblaApi.off('select', onSelect);
        };
    }, [emblaApi, onSelect]);

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <section className="min-h-[90vh] flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 pt-10 md:pt-0">
                <div className="md:w-1/2 z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
                            Innovación Digital <span className="text-blue-600 dark:text-blue-400">Hecha a Tu Medida</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8">
                            <span className="font-semibold text-blue-600 dark:text-blue-400">87% de nuestros clientes</span> aumentan sus ingresos en los primeros 6 meses. ¿Serás el próximo?
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-12">
                            <ContactModal />
                            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
                                Ver casos de éxito <FiArrowRight />
                            </button>
                        </div>

                        <div className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-lg backdrop-blur-sm border border-gray-100 dark:border-gray-700">
                            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Lo que logran nuestros clientes:</h3>
                            <ul className="space-y-2">
                                {[
                                    "Sistemas que ahorran tiempo y son más precisos",
                                    "Reducción de costos operativos",
                                    "Procesos automatizados en 2 semanas"
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                        <FiCheckCircle className="text-green-500" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>

                <div className="md:w-1/2 relative">
                    <HeroImage />
                    <div className="absolute -bottom-10 left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-gray-950 to-transparent"></div>
                </div>
            </section>

            {/* Sección de Servicios */}
            <section className="py-20 relative">
                <div className="absolute inset-0 overflow-hidden -z-10">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-purple-100/50 to-transparent dark:from-purple-900/20"></div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-4">
                        No Vendemos Código,<br />
                        <span className="bg-gradient-to-r from-purple-500 to-blue-500 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                            Vendemos Resultados
                        </span>
                    </h2>
                    <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
                        Cada línea de código está orientada a generar valor tangible para tu negocio
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="flex flex-col p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700 h-full"
                            >
                                <div className="mb-6">
                                    {service.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-6">
                                    {service.description}
                                </p>
                                <ul className="mb-8 space-y-2">
                                    {service.benefits.map((benefit, i) => (
                                        <li key={i} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                            <FiCheckCircle className="text-green-500" /> {benefit}
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-auto">
                                    <ContactModal />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Sección de Testimonios con Embla Carousel */}
            <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl my-12 overflow-hidden">
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                            Lo que dicen <span className="text-blue-600 dark:text-blue-400">nuestros clientes</span>
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            Empresas que ya están transformando su negocio
                        </p>
                    </motion.div>

                    <div className="embla relative" ref={emblaRef}>
                        <div className="embla__container flex">
                            {testimonials.map((testimonial, index) => (
                                <div className="embla__slide flex-[0_0_100%] min-w-0 px-4" key={index}>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5 }}
                                        className="bg-white dark:bg-gray-800/80 p-8 md:p-12 rounded-2xl shadow-sm backdrop-blur-sm border border-gray-100 dark:border-gray-700"
                                    >
                                        <div className="flex flex-col md:flex-row gap-8 items-center">
                                            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-100 dark:border-blue-900/50">
                                                <Image
                                                    src={testimonial.avatar}
                                                    alt={testimonial.name}
                                                    width={96}
                                                    height={96}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                            <div className="flex-1 text-center md:text-left">
                                                <FiArrowRight className="text-4xl text-blue-500/20 dark:text-blue-400/20 mb-4 mx-auto md:mx-0" />
                                                <div className="text-xl md:text-2xl text-gray-900 dark:text-gray-100 mb-6 leading-relaxed">
                                                    {testimonial.quote}
                                                </div>
                                                <div>
                                                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                                        {testimonial.name}
                                                    </div>
                                                    <div className="text-gray-600 dark:text-gray-400">
                                                        {testimonial.role}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center gap-2 mt-8">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => scrollTo(index)}
                                    className={`w-3 h-3 rounded-full transition-all ${index === selectedIndex ? 'bg-blue-600 dark:bg-blue-400 w-6' : 'bg-gray-300 dark:bg-gray-600'}`}
                                    aria-label={`Ir al testimonio ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Final Mejorado */}
            <section className="py-20 relative">
                <div className="absolute inset-0 overflow-hidden -z-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-900/10 dark:to-purple-900/10 backdrop-blur-sm"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-blue-500/10 to-transparent dark:from-blue-900/10 animate-pulse"></div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 rounded-3xl p-8 md:p-12 text-center overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-screen filter blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400 rounded-full mix-blend-screen filter blur-3xl"></div>
                    </div>

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            ¿Listo para la <span className="text-yellow-300">Transformación Digital</span>?
                        </h2>
                        <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                            Agenda tu consultoría gratuita hoy mismo y descubre cómo podemos llevar tu negocio al siguiente nivel
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <ContactModal />
                            <button className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                                Ver demostración <FiArrowRight />
                            </button>
                        </div>

                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            {[
                                "Sin compromisos",
                                "Análisis personalizado",
                                "Propuesta en 48h",
                                "Garantía de satisfacción"
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-2 text-blue-100 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                                    <FiCheckCircle className="text-yellow-300" /> {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </section>
        </main>
    )
}