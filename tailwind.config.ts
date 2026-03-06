import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                display: ['Cinzel Decorative', 'serif'],
                body: ['Rajdhani', 'Lato', 'sans-serif'],
            },
            colors: {
                // Renkler genelde dünyalara göre varsayılan CSS değişkenlerinden idare edilir
                // Tailwind üzerinden fallback ya da spesifik değerler eklenebilir
            }
        },
    },
    plugins: [],
}

export default config;
