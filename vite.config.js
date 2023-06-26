import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/homepage": "http://localhost:5000/",
      "/option": "http://localhost:5000/",
    }
  },
  plugins: [react()],
})
