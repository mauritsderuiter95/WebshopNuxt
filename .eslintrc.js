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
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
