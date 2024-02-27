import * as esbuild from 'esbuild';
import { polyfillNode } from "esbuild-plugin-polyfill-node";
// import htmlPlugin from '@chialab/esbuild-plugin-html';
import { cp } from 'node:fs';

// Define some configuration constants
const srcDir = './src';
const destDir = './dist';
const publicDir = './public';

// Set up environment variables to be used in React runtime
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

let result = await esbuild.build({
  entryPoints: [
    `${srcDir}/main.jsx`,
  ],
  format: 'esm',
  bundle: true,
  splitting: true,
  minify: true,
  sourcemap: true,
  outdir: destDir,
  //  outbase: srcDir,
  assetNames: 'assets/[name]-[hash]',
  chunkNames: '[ext]/[name]-[hash]',
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
    //    htmlPlugin(),
    polyfillNode(),
  ],
})
console.log(result)
