module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@peopleseyes/core-model': '../../packages/core-model/src/index.ts',
            '@peopleseyes/core-logic': '../../packages/core-logic/src/index.ts',
            '@peopleseyes/core-i18n': '../../packages/core-i18n/src/index.ts',
            '@peopleseyes/core-crypto': '../../packages/core-crypto/src/index.ts',
          },
        },
      ],
    ],
  };
};
