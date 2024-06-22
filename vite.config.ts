import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import { viteStaticCopy } from 'vite-plugin-static-copy';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/assets/*.json',
          dest: 'assets'
        }
      ]
    }),
  ]
});