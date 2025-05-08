'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Dialog } from '@headlessui/react'
import { FiX } from 'react-icons/fi'

// Esquema de validación
const formSchema = z.object({
    name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    email: z.string().email('Ingresa un correo electrónico válido'),
    projectType: z.enum(['MOBILE_APP', 'WEBSITE', 'DEV_OPS', 'DESKTOP_APP', 'OTHER'], {
        required_error: 'Selecciona un tipo de proyecto',
    }),
    budget: z.enum(['LESS_5K', '5K-15K', '15K-50K', 'MORE_50K'], {
        required_error: 'Selecciona un rango de presupuesto',
    }),
    timeline: z.enum(['URGENT', '1-3_MONTHS', '3-6_MONTHS', 'FLEXIBLE'], {
        required_error: 'Selecciona un plazo estimado',
    }),
    description: z.string().min(20, 'Describe tu proyecto con al menos 20 caracteres'),
})

type FormValues = z.infer<typeof formSchema>

export default function ContactModal() {
    const [isOpen, setIsOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
        resolver: zodResolver(formSchema)
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onSubmit = async (data: FormValues) => {
        setIsSubmitting(true)
        try {
            // Simular envío a API
            await new Promise(resolve => setTimeout(resolve, 2000))
            setSubmitSuccess(true)
            reset()
            setTimeout(() => setIsOpen(false), 3000)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <button
                title='Toggle'
                onClick={() => setIsOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors dark:bg-blue-500 dark:hover:bg-blue-600"
            >
                Contactar
            </button>

            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel as={motion.div}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl p-6"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <Dialog.Title className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                {submitSuccess ? '¡Gracias!' : 'Cuéntanos tu proyecto'}
                            </Dialog.Title>
                            <button title='Toggle' onClick={() => setIsOpen(false)}>
                                <FiX className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                            </button>
                        </div>

                        {!submitSuccess ? (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                                        Nombre completo
                                    </label>
                                    <input
                                        {...register('name')}
                                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                                        placeholder="Ej: María González"
                                    />
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                                        Correo electrónico
                                    </label>
                                    <input
                                        type="email"
                                        {...register('email')}
                                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                                        placeholder="ejemplo@empresa.com"
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                                        Tipo de proyecto
                                    </label>
                                    <select
                                        {...register('projectType')}
                                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                                    >
                                        <option value="">Selecciona una opción</option>
                                        <option value="MOBILE_APP">Aplicación Móvil</option>
                                        <option value="WEBSITE">Sitio Web/Landing Page</option>
                                        <option value="DESKTOP_APP">Aplicación de Escritorio</option>
                                        <option value="DEV_OPS">Infraestructura/DevOps</option>
                                        <option value="OTHER">Otro</option>
                                    </select>
                                    {errors.projectType && <p className="text-red-500 text-sm mt-1">{errors.projectType.message}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                                            Presupuesto aproximado
                                        </label>
                                        <select
                                            {...register('budget')}
                                            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                                        >
                                            <option value="">Rango de presupuesto</option>
                                            <option value="LESS_5K">Menos de 5.000€</option>
                                            <option value="5K-15K">5.000€ - 15.000€</option>
                                            <option value="15K-50K">15.000€ - 50.000€</option>
                                            <option value="MORE_50K">Más de 50.000€</option>
                                        </select>
                                        {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                                            Plazo estimado
                                        </label>
                                        <select
                                            {...register('timeline')}
                                            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                                        >
                                            <option value="">Plazo de entrega</option>
                                            <option value="URGENT">Urgente (menos de 1 mes)</option>
                                            <option value="1-3_MONTHS">1-3 meses</option>
                                            <option value="3-6_MONTHS">3-6 meses</option>
                                            <option value="FLEXIBLE">Flexible</option>
                                        </select>
                                        {errors.timeline && <p className="text-red-500 text-sm mt-1">{errors.timeline.message}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                                        Describe tu proyecto
                                    </label>
                                    <textarea
                                        {...register('description')}
                                        rows={4}
                                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                                        placeholder="Ej: Necesito una aplicación móvil para gestión de pedidos con..."
                                    />
                                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
                                >
                                    {isSubmitting ? 'Enviando...' : 'Solicitar propuesta'}
                                </button>
                            </form>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                                    ¡Gracias por contactarnos! 🎉
                                </p>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Nuestro equipo te contactará en las próximas 24 horas.
                                </p>
                            </div>
                        )}
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
    )
}