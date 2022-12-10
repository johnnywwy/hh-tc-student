import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import WindiCSS from 'vite-plugin-windicss'
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    WindiCSS(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  // https://www.fastmock.site/mock/45033f3abcac4023031f784f875dbb67/api
  server: {				
    host: '0.0.0.0',
    proxy: {
      "/api": {
        target: "https://www.fastmock.site/mock/45033f3abcac4023031f784f875dbb67/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },	
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
})
