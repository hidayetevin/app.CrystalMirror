import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import tr from './locales/tr.json';

// Dil tercihini al (Browser default veya localStorage)
const getLanguage = () => {
    const saved = localStorage.getItem('appLang');
    if (saved) return saved;
    const userLang = navigator.language || (navigator as any).userLanguage;
    if (userLang.startsWith('tr')) return 'tr';
    return 'en';
};

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en,
            tr
        },
        lng: getLanguage(),
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false // React XSS'ten zaten korur
        }
    });

export { i18n };
