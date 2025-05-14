import './bootstrap';
import '../css/app.css';

// 1. Importez l'initialisation i18n (dans resources/js/i18n.js)
import './i18n';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.jsx`,
      import.meta.glob('./Pages/**/*.jsx')
    ),
  setup({ el, App, props }) {
    const root = createRoot(el);

    // 2. Enveloppez votre <App> avec le provider i18n
    root.render(
      <I18nextProvider i18n={i18n}>
        <App {...props} />
      </I18nextProvider>
    );
  },
  progress: {
    color: '#4B5563',
  },
});
