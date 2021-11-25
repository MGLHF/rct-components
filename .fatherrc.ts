import babel from 'rollup-plugin-babel';
export default {
  esm: {
    type: 'rollup',
  },
  cjs: {
    type: 'rollup',
  },
  umd: {
    sourcemap: true,
  },
  extraRollupPlugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};
