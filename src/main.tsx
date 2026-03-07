import React from 'react';
import { createRoot } from 'react-dom/client';
import { Capacitor } from '@capacitor/core';
import { StatusBar } from '@capacitor/status-bar';
import { App } from './presentation/App';
import './infrastructure/i18n/i18n.config'; // Initialize i18n
import './assets/styles/worlds.css';

// Hide the status bar on mobile devices immediately
if (Capacitor.isNativePlatform()) {
    StatusBar.hide().catch((err) => console.warn('StatusBar hide error:', err));
}

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
