const resolve = require('rollup-plugin-node-resolve')
const path = require('path')
const commonjs = require('rollup-plugin-commonjs')
const babel = require('rollup-plugin-babel')

module.exports = {
  input: 'src/index.js',
  output: {
    file: path.resolve(__dirname, '../../fadraw-demo/src/fadraw.js'),
    format: 'es',
    name: 'Fadraw'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    resolve(),
    commonjs({
      namedExports: {
        konva: ['Konva'],
        'react-konva': ['Stage', 'Layer', 'Text', 'Rect', 'Image', 'Shape', 'Group'],
        'react-dom': ['render'],
        'react-is': ['isElement', 'isValidElementType', 'ForwardRef']
      }
    })
  ],
  external: ['react']
}
