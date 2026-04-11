import { createContext, useContext, useState, useMemo } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState('EN'); 
    
    // Memoize the translations object based on language to avoid unnecessary re-renders
    const t = useMemo(() => translations[language], [language]);
    
    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}