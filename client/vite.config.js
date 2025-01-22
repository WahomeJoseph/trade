import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  root: './', // Ensure the root is correctly set to the client directory
  build: {
    outDir: 'dist', // Output directory
  },
  server: { 
    proxy: {
      '/api': 'http://localhost:5000', // Adjust the port to match your backend server
    }
  }
});
