'use client';

import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {useRouter} from "@/i18n/navigation";

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
        <form
            onSubmit={onSubmit}
            className="max-w-7xl mx-auto px-4 py-12 space-y-6 overflow-y-auto scrollbar-hide sm:max-h-[40rem]"
        >
            <h2 className="text-3xl font-bold mb-4">{tQuiz('quiz_title')}</h2>
            <div className="grid gap-6">
                {tQuiz.raw('questions').map((q:{text:string;options:string[]}, i:number) => {
                    const field = (`q${i+1}`) as keyof QuizValues;
                    const value = watch(field);
                    return (
                        <fieldset key={i} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <legend className="font-semibold">{i+1}. {q.text}</legend>
                            <div className="flex flex-wrap gap-3 mt-2">
                                {q.options.map(opt => (
                                    <button
                                        key={opt}
                                        type="button"
                                        onClick={() => setValue(field, opt, { shouldValidate: true })}
                                        className={`
                      px-3 py-2 rounded-xl border font-medium transition
                      ${value === opt
                                            ? 'bg-purple-600 text-white border-purple-600'
                                            : 'bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:border-purple-600'
                                        }
                    `}
                                    >{opt}</button>
                                ))}
                            </div>
                            <input type="hidden" {...register(field)} />
                        </fieldset>
                    );
                })}
            </div>
            <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className={`
          w-full py-3 rounded-lg font-semibold transition
          ${isValid
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'}
        `}
            >
                {isSubmitting ? tQuiz('submitting') : tQuiz('submit_quiz')}
            </button>
        </form>
    );
}
