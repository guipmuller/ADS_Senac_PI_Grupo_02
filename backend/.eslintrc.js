module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true, // Certifique-se de que o ambiente Node.js está habilitado
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    // Suas regras personalizadas aqui
    'no-unused-vars': 'warn',
    'no-console': 'off',
  },
};
