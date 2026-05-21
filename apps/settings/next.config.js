const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'settings',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './ProfileForm': './src/forms/ProfileForm',
          './PreferencesForm': './src/forms/PreferencesForm',
          './SecurityForm': './src/forms/SecurityForm',
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: false,
          },
          'react-dom': {
            singleton: true,
            requiredVersion: false,
          },
        },
        extraOptions: {
          exposePages: false,
        },
      })
    );

    return config;
  },
};

module.exports = nextConfig;
