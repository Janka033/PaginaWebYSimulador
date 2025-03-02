export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  assetsInclude: ['**/*.glb', '**/*.gltf'],
  build: {
    sourcemap: true,
    outDir: 'dist',
    chunkSizeWarningLimit: 1600,
  },
  server: {
    port: 5173,
    open: true,
    cors: true,
    hmr: {
      overlay: true
    },
    // Aumentar la memoria disponible
    fs: {
      strict: false,
    },
  },
  // Aumentar memoria para Node
  optimizeDeps: {
    disabled: false
  }
})