'use client'

import { useState, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button title='ScrollToTop'
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 cursor-pointer p-3 bg-purple-600 rounded-lg shadow-lg transition-all duration-300 ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
        >
            <FiArrowUp className="text-white text-2xl" />
        </button>
    );
};

export default ScrollToTop