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
        name: 'dashboard',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './StatsWidget': './src/widgets/StatsWidget',
          './ChartWidget': './src/widgets/ChartWidget',
          './ActivityWidget': './src/widgets/ActivityWidget',
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
