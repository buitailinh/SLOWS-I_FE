import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import replace from '@rollup/plugin-replace';
import dotenv from 'dotenv';
dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    replace({
      'process.env.REACT_APP_LOCALHOST_KEY': JSON.stringify(process.env.VITE_NAME_AT_KEY),
      'process.env.GOOGLE_CLIENT_ID': JSON.stringify(process.env.GOOGLE_CLIENT_ID),
      preventAssignment: true,
    }),
    nodePolyfills({
      protocolImports: true,
    }),
  
  ],
  define: {
    'process.env': {}
  },
  server: {
    historyApiFallback: true,
  },

})
