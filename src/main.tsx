import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './presentation/App';
import './infrastructure/i18n/i18n.config'; // Initialize i18n
import './assets/styles/worlds.css';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
