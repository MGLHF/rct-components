import { defineConfig } from 'dumi';
import theme from './theme';

export default defineConfig({
  title: 'magic-components',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  base: 'magic-components/',
  publicPath: '/magic-components/',
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
