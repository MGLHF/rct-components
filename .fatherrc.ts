import babel from 'rollup-plugin-babel';
export default {
  esm: {
    type: 'rollup',
    minify: true,
  },
  cjs: {
    type: 'rollup',
    minify: true,
  },
  umd: {
    sourcemap: true,
    minFile: true,
  },
  extractCSS: true, // 单独生成css文件
  extraRollupPlugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};

// 配置项：https://www.npmjs.com/package/father/v/2.7.3
