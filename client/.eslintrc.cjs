module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true, // Agrega esta línea para permitir el uso de variables de entorno de Node.js
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    react: {
      version: '18.2',
    },
  },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
  },
  globals: {
    process: 'readonly', // Agrega esta línea para definir process como una variable global
  },
}