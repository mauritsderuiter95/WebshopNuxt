module.exports = {
  extends: ['@nuxtjs/eslint-config-typescript', 'airbnb/base'],
  plugins: ['prettier'],
  rules: {
    'import/no-extraneous-dependencies': [
      2,
      {
        devDependencies: ['**/test.tsx', '**/test.ts'],
      },
    ],
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'vue/max-attributes-per-line': false,
    'vue/html-self-closing': false,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
