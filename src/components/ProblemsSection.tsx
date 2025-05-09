'use client'

import { motion } from 'framer-motion';
import { FiZap, FiLink, FiClock, FiHeart } from 'react-icons/fi';

export default function ProblemsSection() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto text-center mb-12"
            >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    ¿Tu sistema limita el crecimiento de tu empresa?
                </h2>
                <p className="text-lg text-gray-800 dark:text-white">
                    Tal vez estés confiando en una solución que no se adapta a tus procesos.
                </p>
                <p className="text-lg text-gray-800 dark:text-white mt-4">
                    Un software estandarizado puede funcionar al principio, pero acaba generando cuellos de botella y gastos innecesarios.
                </p>
                <p className="text-lg text-indigo-600 dark:text-indigo-400 font-semibold mt-6">
                    Rescatamos y optimizamos tus sistemas para que tu inversión rinda al máximo.
                </p>
            </motion.div>

            <div className="max-w-5xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {[
                    {
                        icon: <FiZap className="w-8 h-8 text-purple-500 dark:text-purple-400" />,
                        title: 'Ineficiencias Operativas',
                        desc: 'Automatizamos procesos repetitivos para ahorrar tiempo y costos.',
                    },
                    {
                        icon: <FiLink className="w-8 h-8 text-blue-500 dark:text-blue-400" />,
                        title: 'Falta de Integración',
                        desc: 'Centralizamos herramientas y sistemas para optimizar el flujo de información.',
                    },
                    {
                        icon: <FiClock className="w-8 h-8 text-green-500 dark:text-green-400" />,
                        title: 'Procesos Desactualizados',
                        desc: 'Modernizamos tu infraestructura con soluciones adaptadas a tus necesidades.',
                    },
                    {
                        icon: <FiHeart className="w-8 h-8 text-red-500 dark:text-red-400" />,
                        title: 'Soporte Insuficiente',
                        desc: 'Aseguramos el rendimiento con monitoreo y actualizaciones continuas.',
                    },
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col items-center text-center"
                    >
                        <div className="mb-4">{item.icon}</div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            {item.title}
                        </h3>
                        <p className="text-gray-800 dark:text-white">
                            {item.desc}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}