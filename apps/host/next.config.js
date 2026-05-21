const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@micro-frontend-demo/ui'],
  webpack(config, options) {
    const { isServer } = options;
    
    // Ensure webpack uses the compiled dist folder for the UI package
    config.resolve.alias = {
      ...config.resolve.alias,
      '@micro-frontend-demo/ui$': require.resolve('@micro-frontend-demo/ui'),
    };
    
    config.plugins.push(
      new NextFederationPlugin({
        name: 'host',
        filename: 'static/chunks/remoteEntry.js',
        remotes: {
          dashboard: `dashboard@http://localhost:3001/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
          settings: `settings@http://localhost:3002/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: false,
            eager: true,
          },
          'react-dom': {
            singleton: true,
            requiredVersion: false,
            eager: true,
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
