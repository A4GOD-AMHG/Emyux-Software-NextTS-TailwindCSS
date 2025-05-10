'use client'

import { motion } from 'framer-motion';
import { FiCheckCircle, FiCode, FiCpu, FiDatabase } from 'react-icons/fi';
import ContactModal from '@/components/ContactModal';

const services = [
    {
        icon: <FiCode className="w-12 h-12 sm:w-16 sm:h-16 text-blue-600 dark:text-blue-400" />,
        title: 'Software que Genera Resultados',
        description:
            'No vendemos código, vendemos soluciones que aumentan tus ingresos y reducen costos. Sistemas diseñados exclusivamente para hacer crecer TU negocio.',
        benefits: ['+30% eficiencia', 'ROI medible', 'Escalable'],
    },
    {
        icon: <FiCpu className="w-12 h-12 sm:w-16 sm:h-16 text-purple-500 dark:text-purple-400" />,
        title: 'Automatización que Transforma',
        description:
            'Elimina el trabajo repetitivo de tu equipo con sistemas inteligentes que trabajan 24/7 sin errores. Recupera hasta 15 horas semanales por empleado.',
        benefits: ['0 errores humanos', 'Procesos 5x más rápidos', 'Integración inmediata'],
    },
    {
        icon: <FiDatabase className="w-12 h-12 sm:w-16 sm:h-16 text-blue-600 dark:text-blue-400" />,
        title: 'Sistemas que Impulsan',
        description:
            'ERP/CRM que realmente se adaptan a tus procesos. Olvídate de sistemas genéricos que no cumplen. Control total sobre cada aspecto de tu operación.',
        benefits: ['Ventas +40%', 'Clientes satisfechos', 'Toma decisiones con datos'],
    },
];

export default function ServicesSection() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
            <div className="absolute inset-0 overflow-hidden -z-10">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-purple-100/50 to-transparent dark:from-purple-900/20" />
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative max-w-7xl mx-auto"
            >
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-4">
                    No Vendemos Código,
                    <br />
                    <span className="bg-gradient-to-r from-purple-500 to-blue-500 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                        Vendemos Resultados
                    </span>
                </h2>
                <p className="text-xl text-center text-gray-600 dark:text-white mb-12 max-w-3xl mx-auto">
                    Cada línea de código está orientada a generar valor tangible para tu negocio
                </p>

                <div className="grid gap-8 md:grid-cols-3">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex flex-col p-8 bg-broken-gray dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700 h-full"
                        >
                            <div className="mb-6 flex">
                                {service.icon}
                                <h3 className="ml-4 text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                                    {service.title}
                                </h3>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                {service.description}
                            </p>
                            <ul className="mb-8 space-y-2">
                                {service.benefits.map((benefit, i) => (
                                    <li key={i} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                        <FiCheckCircle className="text-green-500 w-5 h-5" /> {benefit}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-auto text-center">
                                <ContactModal
                                    trigger={
                                        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                                            Contactar
                                        </button>
                                    }
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}