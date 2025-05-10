'use client'

import { motion } from 'framer-motion';
import { useState, useEffect, ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { FiX } from 'react-icons/fi';
import { useTranslations } from 'next-intl';

const createFormSchema = (t: (key: string) => string) => z.object({
    name: z.string().min(2, t('validation.name')),
    email: z.string().email(t('validation.email')),
    projectType: z.enum(['MOBILE_APP', 'WEBSITE', 'DEV_OPS', 'DESKTOP_APP', 'OTHER'], {
        required_error: t('validation.project_type')
    }),
    timeline: z.enum(['URGENT', '1-3_MONTHS', '3-6_MONTHS', 'FLEXIBLE'], {
        required_error: t('validation.timeline')
    }),
    description: z.string()
        .min(20, t('validation.description'))
        .max(250)
})

type FormValues = z.infer<ReturnType<typeof createFormSchema>>

interface ContactModalProps {
    trigger: ReactNode
}

export default function ContactModal({ trigger }: ContactModalProps) {
    const t = useTranslations('ContactModal')
    const formSchema = createFormSchema(t)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [submitSuccess, setSubmitSuccess] = useState<boolean>(false)
    const [charsLeft, setCharsLeft] = useState(250)

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<FormValues>({
        resolver: zodResolver(formSchema)
    })

    const description = watch('description', '')

    useEffect(() => {
        setCharsLeft(250 - description.length)
    }, [description])

    const onSubmit = async (data: FormValues) => {
        setIsSubmitting(true)
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

            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-[1000]">
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                <div className="fixed inset-0 flex items-center justify-center p-6 sm:p-12">
                    <DialogPanel as={motion.div}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-[95%] sm:max-w-2xl bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8"
                    >
                        <div className="flex justify-between items-center mb-4 sm:mb-6">
                            <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                                {submitSuccess ? t('success_title') : t('title')}
                            </DialogTitle>
                            <button
                                title={t('common.close')}
                                onClick={() => setIsOpen(false)}
                                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                <FiX className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500 dark:text-gray-400" />
                            </button>
                        </div>

                        {!submitSuccess ? (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                        <div>
                                            <label className="block text-sm font-medium mb-1 sm:mb-2 text-gray-700 dark:text-gray-300">
                                                {t('labels.name')}
                                            </label>
                                            <input
                                                {...register('name')}
                                                className="w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 text-sm sm:text-base"
                                                placeholder={t('placeholders.name')}
                                            />
                                            {errors.name && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.name.message}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-1 sm:mb-2 text-gray-700 dark:text-gray-300">
                                                {t('labels.email')}
                                            </label>
                                            <input
                                                type="email"
                                                {...register('email')}
                                                className="w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 text-sm sm:text-base"
                                                placeholder={t('placeholders.email')}
                                            />
                                            {errors.email && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email.message}</p>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                        <div>
                                            <label className="block text-sm font-medium mb-1 sm:mb-2 text-gray-700 dark:text-gray-300">
                                                {t('labels.project_type')}
                                            </label>
                                            <select
                                                {...register('projectType')}
                                                className="w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 text-sm sm:text-base"
                                            >
                                                <option value="">{t('placeholders.project_type')}</option>
                                                {Object.entries(t.raw('options.project_types')).map(([key, value]) => (
                                                    <option key={key} value={key}>{value as string}</option>
                                                ))}
                                            </select>
                                            {errors.projectType && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.projectType.message}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-1 sm:mb-2 text-gray-700 dark:text-gray-300">
                                                {t('labels.timeline')}
                                            </label>
                                            <select
                                                {...register('timeline')}
                                                className="w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 text-sm sm:text-base"
                                            >
                                                <option value="">{t('placeholders.timeline')}</option>
                                                {Object.entries(t.raw('options.timelines')).map(([key, value]) => (
                                                    <option key={key} value={key}>{value as string}</option>
                                                ))}
                                            </select>
                                            {errors.timeline && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.timeline.message}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-center mb-1 sm:mb-2">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {t('labels.description')}
                                            </label>
                                            <span className={`text-xs sm:text-sm ${charsLeft < 0 ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
                                                {charsLeft} {t('chars_left')}
                                            </span>
                                        </div>
                                        <textarea
                                            {...register('description')}
                                            maxLength={250}
                                            rows={4}
                                            className="w-full px-3 py-2 sm:px-4 sm:py-3 resize-none border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 text-sm sm:text-base"
                                            placeholder={t('placeholders.description')}
                                        />
                                        {errors.description && (
                                            <p className="text-red-500 text-xs sm:text-sm mt-1">
                                                {errors.description.message}
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-medium text-sm sm:text-base transition-colors disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
                                    >
                                        {isSubmitting ? t('submitting') : t('submit')}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="text-center py-6 sm:py-12">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 w-8 sm:h-10 sm:w-10 text-green-500"
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
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 sm:mb-4">
                                    {t('success_title')}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base max-w-md mx-auto">
                                    {t('success_message')}
                                </p>
                            </div>
                        )}
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}