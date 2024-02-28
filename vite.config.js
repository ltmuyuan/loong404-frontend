import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  alias: {
    '/@': path.resolve(__dirname, 'src') // 设置 @ 导航到 src 目录
  },
  plugins: [react()],
})
