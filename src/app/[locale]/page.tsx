"use client"

import ContactModal from '@/components/ContactModal'
import { motion } from 'framer-motion'


const services = [
    {
        title: "Desarrollo Personalizado",
        description: "Soluciones adaptadas a tus necesidades específicas"
    },
    {
        title: "Sistemas Empresariales",
        description: "ERP y CRM personalizados para tu organización"
    },
    {
        title: "Aplicaciones Móviles",
        description: "Apps nativas e híbridas con tecnología de punta"
    }
]

export default function Home() {
    return (

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Sección Hero */}
            <section className="min-h-screen flex items-center justify-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                        Transformamos ideas en <span className="text-blue-600 dark:text-blue-400">realidad digital</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                        Soluciones tecnológicas a medida para impulsar tu negocio
                    </p>
                </motion.div>
            </section>

            {/* Sección Servicios */}
            <section className="py-20">
                <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
                    Nuestros Servicios
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl"
                        >
                            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                                {service.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                {service.description}
                            </p>
                            <ContactModal />
                        </motion.div>
                    ))}
                </div>
            </section>

        </main>

    )
}