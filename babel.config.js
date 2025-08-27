module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./app'], // veya ['./src'] klasör yapınıza göre
        alias: {
          '@hocs': './app/hocs',
          '@config': './app/config',
          '@components': './app/components', // /index kısmını kaldırın
          '@screens': './app/screens',
          '@utils': './app/utils',
          '@state': './app/state',
          '@navigation': './app/navigation',
          '@commonComponents': './app/commonComponents',
          '@duck': './app/state/ducks',
          '@assets': './app/assets',
          '@fetch': './app/state/fetch',
          '@common': './app/commonComponents',
          '@data': './app/data',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};