import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AuthProvider } from '../lib/auth-context';
import { QueryProvider } from '../lib/query-provider';
import { ToastProvider } from '../components/ui/toast';
import { PwaRegister } from '../components/pwa/pwa-register';
import { PwaInstallPrompt } from '../components/pwa/pwa-install-prompt';

export const metadata: Metadata = {
  title: 'Sarswati Gyan Mandir | Intermediate College & School ERP',
  description:
    'Sarswati Gyan Mandir, Shamsabad Farrukhabad UP - A premier intermediate school providing holistic education and centralized school information portal.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'SGM ERP',
  },
  icons: {
    icon: '/icon-192.png',
    shortcut: '/icon-192.png',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#002060',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="SGM ERP" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
      </head>
      <body className="antialiased text-slate-900 bg-slate-50 min-h-screen">
        <QueryProvider>
          <AuthProvider>
            <ToastProvider>
              <PwaRegister />
              <PwaInstallPrompt />
              {children}
            </ToastProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
