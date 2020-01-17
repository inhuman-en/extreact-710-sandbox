module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'entry',
          corejs: '2',
          modules: false,
        },
      ],
      '@babel/preset-react',
    ],
  };
};
