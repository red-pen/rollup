/*
 * @Author: red-pen
 */
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';
import resolve from 'rollup-plugin-node-resolve'; // 帮助寻找node_modules里的包
import babel from 'rollup-plugin-babel'; // rollup 的 babel 插件，ES6转ES5
import commonjs from 'rollup-plugin-commonjs'; // 将非ES6语法的包转为ES6可用
import path from 'path';
import image from '@rollup/plugin-image'; // 处理图片

const pkg = require('./package.json');

const plugins = [
  image(),
  postcss({
    use: [
      [
        'less',
        {
          javascriptEnabled: true,
          modifyVars: {
            // antd主题配置
            // 颜色
            'primary-color': '#52C9A0', // 主色
            'border-radius-base': '4px',
            'success-color': '#52C41A', // 成功色
            'warning-color': '#FAAD14', // 警告包
            'error-color': '#F5222D', // 错误色
            'body-background': '#FAFAFA', // 页面背影颜色
          },
        },
      ],
    ],
    extensions: ['.css', '.less'],
    extract: path.resolve('./dist/style/index.css'),
  }),
  // babel处理不包含node_modules文件的所有js
  babel({
    exclude: '**/node_modules/**',
    runtimeHelpers: true,
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  }),
  resolve({ extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'] }),
  // 这里有些引入使用某个库的api但报未导出改api通过namedExports来手动导出
  commonjs({
    include: 'node_modules/**',
    namedExports: {
      'node_modules/react-is/index.js': ['isFragment', 'isMemo'],
    },
  }),
];

const external = [
  'react',
  'react-dom',
  'antd',
  'crypto-js',
  'classnames',
  '@ant-design/icons',
  '@xylink/xy-image-validate',
];

const config = [
  {
    plugins,
    external,
    input: './src/index.tsx',
    output: [{ dir: 'dist', format: 'esm', entryFileNames: '[name].esm.js' }],
  },
  {
    plugins,
    external,
    input: './src/index.tsx',
    output: [{ dir: 'dist', format: 'cjs', entryFileNames: '[name].cjs.js' }],
  },
  {
    plugins,
    external,
    input: './src/index.tsx',
    output: [{ dir: 'dist', format: 'umd', name: 'index.umd.js' }],
  },
  {
    input: './src/index.tsx',
    output: {
      file: path.resolve('./', pkg.types),
      format: 'es',
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    plugins: [...plugins, dts()],
  },
];

export default config;
