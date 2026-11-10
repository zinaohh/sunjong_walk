import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 정적 파일(dist/)로만 빌드한다.
// - 웹: Vercel이 dist/를 그대로 배포
// - 앱: 나중에 Capacitor 등으로 dist/를 감싸서 출시
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
  },
});
