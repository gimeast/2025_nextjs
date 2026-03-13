import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    watch: {
      //vite가 server 파일안에 있는 모든 파일을 감지하지않게 설정하여 변화가 생겨도 리액트앱을 리렌더링 시킨다던가 불필요한 동작을 하지않게 해준다.
      ignored: ['**/server/**'],
    },
  },
});
