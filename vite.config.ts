import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    // host: '0.0.0.0'
    host: true
  }
  // server: {
  //   proxy: {
  //     '/plataforma': {
  //       target: 'http://192.168.27.222:5010',
  //       changeOrigin: true,
  //       secure: false
  //     }
  //   }
  // },
})
