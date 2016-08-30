import buble from 'rollup-plugin-buble';

const external = [
  'iframe-resizer/js/iframeResizer',
  'react',
  'object-assign',
  'lodash.omit',
];

export default {
  entry: 'src/index.js',
  external,
  plugins: [
    buble({
      objectAssign: 'objectAssign',
    }),
  ],
  format: 'cjs',
  dest: 'dist/index.js',
};
