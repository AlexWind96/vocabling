import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      devOptions: {
        enabled: true,
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Lango',
        short_name: 'Lango App',
        start_url: '/',
        description: 'Tool for saving and learning foreign words in context',
        icons: [
          {
            src: 'icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
        theme_color: '#f8fafc',
        background_color: '#f8fafc',
        display: 'standalone',
      },
    }),
  ],
  resolve: {
    alias: {
      '@entities': '/src/entities',
      '@features': '/src/features',
      '@pages': '/src/pages',
      '@shared': '/src/shared',
      '@widgets': '/src/widgets',
    },
  },
})
