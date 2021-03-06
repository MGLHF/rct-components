import { defineConfig } from 'dumi';
import theme from './theme';

export default defineConfig({
  logo: '/public/images/favicon.jpeg',
  title: 'rct-components',
  base: '/rct-components/docs-dist',
  publicPath: '/rct-components/docs-dist/',
  exportStatic: {},
  outputPath: 'docs-dist',
  mode: 'site',
  theme,
  styles: [`body { font-size: 13px; }`],
  resolve: {
    includes: ['docs'],
  },
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
  sass: {
    // 默认值 Dart Sass，如果要改用 Node Sass，可安装 node-sass 依赖，然后使用该配置项
    implementation: require('node-sass'),
    // 传递给 Dart Sass 或 Node Sass 的配置项，可以是一个 Function
    sassOptions: {},
  },
});
