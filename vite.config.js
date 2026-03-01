import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: false,  // Disable for production
            buildDirectory: 'build',  // Explicit build directory
        }),
        react(),
    ],
    build: {
        outDir: 'public/build',
        assetsDir: 'assets',
        emptyOutDir: true,
        manifest: 'manifest.json',
    },
    server: {
        hmr: {
            clientPort: 5173,  // Keep for development
        },
    },
});
