const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@micro-frontend-demo/ui'],
  webpack(config, options) {
    // Ensure webpack uses the compiled dist folder for the UI package
    config.resolve.alias = {
      ...config.resolve.alias,
      '@micro-frontend-demo/ui$': require.resolve('@micro-frontend-demo/ui'),
    };

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
