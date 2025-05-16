'use client';

import { ReactNode, useCallback } from 'react';

type Props = { children: ReactNode };

export default function ScrollToContactButton({ children }: Props) {
    const scrollToContact = useCallback(() => {
        const section = document.getElementById('contact');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    return (
        <button
            onClick={scrollToContact}
            className="flex bg-gradient-to-r self-center from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg"
        >
            {children}
        </button>
    );
}
