'use client';

import { useEffect } from 'react';

export const PwaRegister: React.FC = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('✅ SGM PWA ServiceWorker registered with scope:', registration.scope);
          })
          .catch((error) => {
            console.error('❌ SGM PWA ServiceWorker registration failed:', error);
          });
      });
    }
  }, []);

  return null;
};
