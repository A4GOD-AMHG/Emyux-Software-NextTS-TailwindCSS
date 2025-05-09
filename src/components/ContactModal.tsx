'use client'

import { motion } from 'framer-motion';
import { useState, useEffect, ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogPanel } from '@headlessui/react';
import { FiX } from 'react-icons/fi';

// Esquema de validación actualizado
const formSchema = z.object({
    name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    email: z.string().email('Ingresa un correo electrónico válido'),
    projectType: z.enum(['MOBILE_APP', 'WEBSITE', 'DEV_OPS', 'DESKTOP_APP', 'OTHER'], {
        required_error: 'Selecciona un tipo de proyecto',
    }),
    timeline: z.enum(['URGENT', '1-3_MONTHS', '3-6_MONTHS', 'FLEXIBLE'], {
        required_error: 'Selecciona un plazo estimado',
    }),
    description: z.string().min(20, 'Describe tu proyecto con al menos 20 caracteres').max(250),
});

type FormValues = z.infer<typeof formSchema>

interface ContactModalProps {
    trigger: ReactNode;
}

export default function ContactModal({ trigger }: ContactModalProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
    const [charsLeft, setCharsLeft] = useState(250);

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<FormValues>({
        resolver: zodResolver(formSchema)
    })

    const description = watch('description', '');

    useEffect(() => {
        setCharsLeft(250 - description.length);
    }, [description]);

    const onSubmit = async (data: FormValues) => {
        setIsSubmitting(true);
        try {
            console.log(data)
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
            <div onClick={() => setIsOpen(true)} className="inline-block">
                {trigger}
            </div>

            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel as={motion.div}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl p-8"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <Dialog.Title className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                {submitSuccess ? '¡Gracias!' : 'Cuéntanos tu proyecto'}
                            </Dialog.Title>
                            <button
                                title='Cerrar modal'
                                onClick={() => setIsOpen(false)}
                                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                <FiX className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                            </button>
                        </div>

                        {!submitSuccess ? (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                            Nombre completo
                                        </label>
                                        <input
                                            {...register('name')}
                                            className="w-full px-4 py-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                                            placeholder="Ej: María González"
                                        />
                                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                            Correo electrónico
                                        </label>
                                        <input
                                            type="email"
                                            {...register('email')}
                                            className="w-full px-4 py-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                                            placeholder="ejemplo@empresa.com"
                                        />
                                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                            Tipo de proyecto
                                        </label>
                                        <select
                                            {...register('projectType')}
                                            className="w-full px-4 py-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
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

                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                            Plazo estimado
                                        </label>
                                        <select
                                            {...register('timeline')}
                                            className="w-full px-4 py-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
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
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Describe tu proyecto
                                        </label>
                                        <span className={`text-sm ${charsLeft < 0 ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
                                            {charsLeft} caracteres restantes
                                        </span>
                                    </div>
                                    <textarea
                                        {...register('description')}
                                        maxLength={250}
                                        rows={6}
                                        className="w-full px-4 py-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                                        placeholder="Ej: Necesito una aplicación móvil para gestión de pedidos con..."
                                    />
                                    {errors.description && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.description.message}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg font-medium text-lg transition-colors disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
                                >
                                    {isSubmitting ? 'Enviando...' : 'Solicitar propuesta'}
                                </button>
                            </form>
                        ) : (
                            <div className="text-center py-12">
                                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-10 w-10 text-green-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                                    ¡Mensaje enviado con éxito!
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                                    Hemos recibido tu información. Uno de nuestros especialistas se pondrá en contacto contigo en las próximas 24 horas.
                                </p>
                            </div>
                        )}
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}