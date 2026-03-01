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
        manifest: true,
        assetsDir: 'assets',
        emptyOutDir: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor': ['react', 'react-dom'],
                    'app': 'resources/js/app.jsx',
                },
            },
        },
    },
    server: {
        hmr: {
            clientPort: 5173,  // Keep for development
        },
    },
});
