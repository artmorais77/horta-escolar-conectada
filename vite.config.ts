import { copyFile } from 'node:fs/promises'
import { join } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import type {} from 'vite-react-ssg'

// Subdiretório onde o site fica no GitHub Pages (https://usuario.github.io/horta/).
// No GitHub Actions ele é definido automaticamente a partir do nome do repositório.
const base = process.env.BASE_PATH || '/horta/'

export default defineConfig({
  base,
  plugins: [react()],
  ssgOptions: {
    dirStyle: 'nested', // gera alface/index.html, coentro/index.html...
    formatting: 'none',
    beastiesOptions: false,
    // Pré-renderiza também a página de erro, que vira 404.html no fim.
    includedRoutes: (paths) => [...paths.filter((p) => !p.includes('*')), '/404'],
    async onFinished(dir) {
      await copyFile(join(dir, '404', 'index.html'), join(dir, '404.html'))
    },
  },
})
