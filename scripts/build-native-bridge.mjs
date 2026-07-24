import { build } from 'esbuild';

await build({
  entryPoints: ['native/native-save-entry.js'],
  bundle: true,
  outfile: 'native-save.js',
  format: 'iife',
  target: ['es2022'],
  minify: true,
  sourcemap: false,
  legalComments: 'none'
});
console.log('wrote native-save.js');
