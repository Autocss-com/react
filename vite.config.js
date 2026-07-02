import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base '/react/' matches the GitHub Pages project URL:
// https://autocss-com.github.io/react/
// https://vite.dev/config/
export default defineConfig({
  base: '/react/',
  plugins: [react()],
})
