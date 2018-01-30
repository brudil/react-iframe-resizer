import typescript from 'rollup-plugin-typescript2';
import uglify from 'rollup-plugin-uglify';

export default {
  input: './src/index.tsx',
  output: [
    {
      file: './dist/index.js',
      format: 'cjs',
    },
    {
      file: './dist/index.es.js',
      format: 'es',
    }
  ],
  external: ['react', 'iframe-resizer/js/iframeResizer'],
  plugins: [
    typescript(),
    uglify()
  ]
}