// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'
import { PROJECT_VERSION, PROJECT_LAST_BUILD_DATE, SENTRY_URL, NODE_ENV, isDevEnv, isProdEnv, SENTRY_ENEABLED_FORCE, BACKEND_VERSION } from './src/shared/config/env.ts'

Sentry.init({
  dsn: SENTRY_URL,
  environment: NODE_ENV,
  enabled: isDevEnv || isProdEnv || SENTRY_ENEABLED_FORCE,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  normalizeDepth: 100,

  initialScope: {
    tags: {
      version: PROJECT_VERSION,
      last_build_time: new Date(PROJECT_LAST_BUILD_DATE).toLocaleString(),
      backendVersion: BACKEND_VERSION
    },
  },

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
})
