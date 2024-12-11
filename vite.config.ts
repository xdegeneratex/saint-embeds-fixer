import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        'name': 'Saint Embeds Fixer',
        'icon': 'https://simp4.jpg.church/simpcityIcon192.png',
        'namespace': 'https://github.com/xdegeneratex',
        'match': ['https://simpcity.su/threads/*'],
        'run-at': 'document-start',
        'author': 'xdegeneratex',
        'connect': ['saint2.su', 'saint2.pk', 'saint2.cr'],
        'license': 'WTFPL; http://www.wtfpl.net/txt/copying/',
        'downloadURL': 'https://github.com/xdegeneratex/saint-embeds-fixer/raw/main/dist/build.user.js',
        'updateURL': 'https://github.com/xdegeneratex/saint-embeds-fixer/raw/main/dist/build.user.js',
      },
      build: {
        fileName: 'build.user.js',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
