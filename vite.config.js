

import tailwindcss from '@tailwindcss/vite'
import flowbiteReact from "flowbite-react/plugin/vite";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss(), flowbiteReact()],
//   resolve: {
//     alias: {
//       'tailwindcss': path.resolve(__dirname, 'node_modules/tailwindcss')
//     }
//   }
// })

export default defineConfig({
  plugins: [react(), flowbiteReact(),tailwindcss()], // Removed tailwindcss() here
  css: {
    postcss: path.resolve(__dirname, 'postcss.config.js') // Use postcss for Tailwind
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});