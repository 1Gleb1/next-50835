const runtimeCaching = require('next-pwa/cache')
const { withSentryConfig } = require('@sentry/nextjs')

const withPWA = require('next-pwa')({
  dest: 'public',
  runtimeCaching,
  disable: process.env.NODE_ENV === 'development',
})
const { i18n } = require('./next-i18next.config')
const packageVersion = require('./package.json').version
const backendVersion = require('./package.json').backendVersion

/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: true,
  swcMinify: true,
  ...Object.keys(process.env).reduce(
    (acc, el) => {
      acc[el.startsWith('NEXT_PUBLIC_') ? 'publicRuntimeConfig' : 'serverRuntimeConfig'][el] = process.env[el]
      return acc
    },
    {
      serverRuntimeConfig: {},
      publicRuntimeConfig: {
        NEXT_PUBLIC_PROJECT_VERSION: packageVersion,
        NEXT_PUBLIC_PROJECT_LAST_BUILD_DATE: Date.now(),
        NEXT_PUBLIC_BACKEND_VERSION: backendVersion,
      },
    }
  ),
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreBuildErrors: true,
  },
  i18n,
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/i,
      type: 'asset',
      resourceQuery: /url/, // *.svg?url
    })
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
      use: ['@svgr/webpack'],
    })
    return config
  },
}

module.exports = withPWA(
  withSentryConfig(
    { ...baseConfig, baseConfig },
    {
      // For all available options, see
      // https://github.com/getsentry/sentry-webpack-plugin#options
      // Suppresses source map uploading logs during build
      silent: true,
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
    },
    {
      // For all available options, see:
      // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

      // Upload a larger set of source maps for prettier stack traces (increases build time)
      widenClientFileUpload: true,

      // Transpiles SDK to be compatible with IE11 (increases bundle size)
      transpileClientSDK: true,

      // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
      tunnelRoute: '/monitoring',

      // Hides source maps from generated client bundles
      hideSourceMaps: true,

      // Automatically tree-shake Sentry logger statements to reduce bundle size
      disableLogger: true,
    }
  )
)
