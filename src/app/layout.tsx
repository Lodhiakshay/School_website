import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AuthProvider } from '../lib/auth-context';
import { QueryProvider } from '../lib/query-provider';
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
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
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
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className="antialiased text-slate-900 bg-slate-50 min-h-screen">
        <QueryProvider>
          <AuthProvider>
            <PwaRegister />
            <PwaInstallPrompt />
            {children}
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
