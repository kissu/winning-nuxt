import path from 'node:path'
import { createRouter, createWebHistory } from 'vue-router';
import type { RouterOptions } from '@nuxt/schema';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: false,

  // router: {
  //   options: {
  //     history: (baseURL?: string) => createWebHistory(baseURL || '/pizza/'),
  //   } as RouterOptions,
  // },

  // modules
  modules: ['@nuxtjs/tailwindcss'],

  devServer: {
    port: 5233,
    host: 'localhost',
  },

  vite: {
    server: {
      strictPort: true,
      hmr: {
        host: 'localhost',
        port: 5133
      },
    },
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: '_nuxt/[name].js',
          entryFileNames: '_nuxt/[name].js',
          assetFileNames: '_nuxt/[name].[ext]'
        }
      }
    },
    $client: {
      build: {
        rollupOptions: {
          output: {
            chunkFileNames: '_nuxt/[name].js',
            entryFileNames: '_nuxt/[name].js'
          }
        }
      }
    },
    plugins: [
      // Add live reload functionality for PHP files
      {
        name: 'php-live-reload',
        configureServer(server) {
          server.watcher.add([
            __dirname + '/../(App|Config|Views)/**/*.php',
            __dirname + '/../public/*.php',
          ])
        }
      }
    ],
  },
})
