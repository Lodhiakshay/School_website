import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'सरस्वती ज्ञान मन्दिर इण्टर कॉलेज',
    short_name: 'SGM College',
    description: 'Official Academic & ERP Portal - Saraswati Gyan Mandir Intermediate College, Shamsabad, Farrukhabad (UP)',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#002060',
    theme_color: '#002060',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}

