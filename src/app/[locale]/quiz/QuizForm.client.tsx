'use client';

import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {useRouter} from "@/i18n/navigation";
import { motion, AnimatePresence } from 'framer-motion';

const createQuestionnaireSchema = (t: (key: string) => string) => z.object({
    q1: z.string().min(1, t('validation.question')),
    q2: z.string().min(1, t('validation.question')),
    q3: z.string().min(1, t('validation.question')),
    q4: z.string().min(1, t('validation.question')),
    q5: z.string().min(1, t('validation.question')),
    q6: z.string().min(1, t('validation.question')),
    q7: z.string().min(1, t('validation.question')),
    q8: z.string().min(1, t('validation.question')),
});
type QuizValues = z.infer<ReturnType<typeof createQuestionnaireSchema>>;

const questionAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
};

export default function QuizForm() {
    const tQuiz = useTranslations('QuizForm');
    const router = useRouter();

    const [initialData, setInitialData] = useState<{ name: string; email: string; phone: string }>();
    useEffect(() => {
        const saved = localStorage.getItem('contactFormData');
        if (saved) setInitialData(JSON.parse(saved));
    }, []);

    const { register, handleSubmit, watch, setValue, formState } = useForm<QuizValues>({
        resolver: zodResolver(createQuestionnaireSchema(tQuiz)),
        mode: 'onChange',
    });
    const { isValid, isSubmitting } = formState;

    const onSubmit = handleSubmit(async (quizData) => {
        if (!initialData) return alert('Faltan tus datos de contacto');
        const payload = { ...initialData, questions: quizData };
        try {
            const res = await fetch('/api/sheet', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(payload),
            });
            if (!res.ok) new Error('Error guardando en Sheets');
            router.push('/calendly');
        } catch {
            alert('Hubo un error enviando el quiz. Intenta de nuevo.');
        }
    });

    if (!initialData) return <p>{tQuiz('loading')}…</p>;

    return (
        <main className="flex-1 w-full">
            <motion.form
                onSubmit={onSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12"
            >
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl sm:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                >
                    {tQuiz('quiz_title')}
                </motion.h2>

                <div className="grid gap-6">
                    <AnimatePresence>
                        {tQuiz.raw('questions').map((q: { text: string; options: string[] }, i: number) => {
                            const field = (`q${i + 1}`) as keyof QuizValues;
                            const value = watch(field);
                            return (
                                <motion.div
                                    key={i}
                                    variants={questionAnimation}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
                                >
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                        {i + 1}. {q.text}
                                    </h3>

                                    <div className="flex flex-wrap gap-3">
                                        {q.options.map(opt => (
                                            <button
                                                key={opt}
                                                type="button"
                                                onClick={() => setValue(field, opt, { shouldValidate: true })}
                                                className={`
                                                    px-4 py-2 cursor-pointer rounded-lg border-2 font-medium 
                                                    transition-colors duration-200 text-sm sm:text-base
                                                    whitespace-normal text-left
                                                    ${value === opt
                                                    ? 'bg-purple-600 text-white border-purple-600'
                                                    : 'bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:border-purple-500'
                                                }
                                                `}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                    <input type="hidden" {...register(field)} />
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-12 text-center"
                >
                    <button
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        className={`
                            w-36 h-16 rounded-xl font-semibold 
                            transition-all duration-300
                            text-base sm:text-lg
                            ${isValid
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white hover:shadow-lg'
                            : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'}
                        `}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="w-2 h-2 bg-white rounded-full animate-bounce" />
                                <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-100" />
                                <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-200" />
                            </span>
                        ) : (
                            tQuiz('submit_quiz')
                        )}
                    </button>
                </motion.div>
            </motion.form>
        </main>
    );
}
