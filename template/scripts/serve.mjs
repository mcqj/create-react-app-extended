// FYI - Extension for inlining images:-
//   https://www.npmjs.com/package/esbuild-plugin-inline-images

import * as esbuild from 'esbuild';
import { polyfillNode } from 'esbuild-plugin-polyfill-node';
import { exec } from 'node:child_process';
import { cp } from 'node:fs';

// Define some configuration constants
const srcDir = './src';
const destDir = './dev';
const publicDir = './public';

// Create a watch plugin that will log rebuilds
const watchPlugin = {
  name: 'watch-plugin',
  setup(build) {
    build.onStart(() => {
      console.log(`Build started at ${new Date()}`);
    });

    build.onEnd((result) => {
      const now = new Date();
      if (result.errors.length > 0) {
        console.log(`Build finished with errors at ${now}`);
      } else {
        console.log(`Build finished successfully at ${now}`);
      }
    });
  },
};

// Copy public folder contents to build destination
const reactEnv = {};
Object.entries(process.env).forEach(([key, value]) => {
  if (key.startsWith('REACT_APP_')) {
    reactEnv[`process.env.${key}`] = `"${value}"`;
  }
});

// Copy public folder contents to build destination
cp(publicDir, destDir, { recursive: true }, (err) => {
  if (err) {
    console.error(err);
  }
});

let ctx = await esbuild.context({
  entryPoints: [
    `${srcDir}/main.jsx`,
  ],
  bundle: true,
  outdir: destDir,
  chunkNames: '[ext]/[name]-[hash]',
  assetNames: 'assets/[name]-[hash]',
  loader: {
    '.jpg': 'file',
    '.jpeg': 'file',
    '.png': 'file',
    '.svg': 'file',
    '.ico': 'file',
    '.woff': 'file',
    '.woff2': 'file',
    '.ttf': 'file',
    '.wav': 'file',
    '.md': 'file',
    '.js': 'jsx',
  },
  jsx: 'automatic',
  define: {
    global: 'globalThis',
    ...reactEnv,
  },
  plugins: [
    watchPlugin,
    polyfillNode(),
  ],
})

await ctx.watch()

let { host, port } = await ctx.serve({
  host: 'localhost',
  port: 3100,
  servedir: destDir,
  fallback: `${destDir}/index.html`,
})

const url = (`http://${host}:${port}`);
const start = (process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open');
exec(start + ' ' + url);
