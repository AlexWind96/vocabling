import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        globPatterns: ['**/*.{js,jsx,ts,tsx,css,scss,html,ico,png,svg,json,txt,woff2}'],
        cleanupOutdatedCaches: false,
      },
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
        theme_color: '#db2777',
        background_color: '#f8fafc',
        display: 'standalone',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
