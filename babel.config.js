module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  env: {
    test: {
      plugins: [
        ['module-resolver', {
          alias: {
            'fusion:themes': './jest/mocks/themes.js',
            'fusion:context': './jest/mocks/context.js',
          },
        }],
      ],
    },
  },
};
