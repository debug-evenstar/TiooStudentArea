import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import pluginRewriteAll from 'vite-plugin-rewrite-all';

// https://vitejs.dev/config/
export default defineConfig({
  // depending on your application, base can also be "/"
  base: '/',
  plugins: [react(), viteTsconfigPaths(), pluginRewriteAll()],
  server: {    
      // this ensures that the browser opens upon server start
      open: true,
      // this sets a default port to 3000  
      port: 3000, 
  },
})