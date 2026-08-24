import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '../lib/auth-context';
import { QueryProvider } from '../lib/query-provider';

export const metadata: Metadata = {
  title: 'Sarswati Gyan Mandir | Intermediate College & School ERP',
  description:
    'Sarswati Gyan Mandir, Shamsabad Farrukhabad UP - A premier intermediate school providing holistic education and centralized school information portal.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased text-slate-900 bg-slate-50 min-h-screen">
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
