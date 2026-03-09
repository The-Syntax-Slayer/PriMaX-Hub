import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('primax-theme') || 'dark';
    });
    const [accent, setAccent] = useState(() => {
        return localStorage.getItem('accent') || '#7c3aed';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('primax-theme', theme);
    }, [theme]);

    useEffect(() => {
        const rgb = localStorage.getItem('accent_rgb') || '124, 58, 237';
        document.documentElement.style.setProperty('--accent', accent);
        document.documentElement.style.setProperty('--accent-rgb', rgb);
        localStorage.setItem('accent', accent);
    }, [accent]);

    const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

    const updateAccent = (hex, rgb) => {
        localStorage.setItem('accent_rgb', rgb);
        setAccent(hex);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, accent, updateAccent }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
    return ctx;
}
