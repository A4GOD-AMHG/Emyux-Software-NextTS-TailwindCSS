'use client'

import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';
import ContactModal from '@/components/ContactModal';

export default function ImprovedCTA() {
    return (
        <section className="py-16 mb-12 px-4 sm:px-6 lg:px-8 relative">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-700 to-indigo-900 opacity-80 backdrop-blur-sm"></div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative z-10 text-center max-w-xl mx-auto"
            >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                    ¿Listo para la <span className="text-yellow-300">Transformación Digital</span>?
                </h2>
                <p className="text-lg sm:text-xl text-indigo-100 mb-8">
                    Agenda tu consultoría gratuita hoy mismo y descubre cómo podemos llevar tu negocio al siguiente nivel
                </p>

                <ContactModal
                    trigger={
                        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-indigo-900 font-semibold rounded-lg transition-colors">
                            Hablar con un Experto
                        </button>
                    }
                />

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    {['Sin compromisos', 'Análisis personalizado', 'Propuesta en 48h', 'Garantía de satisfacción'].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white backdrop-blur-sm">
                            <FiCheckCircle className="w-4 h-4 text-yellow-300" />
                            {item}
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
