// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'
import { PROJECT_VERSION, PROJECT_LAST_BUILD_DATE, SENTRY_URL, NODE_ENV, isDevEnv, isProdEnv, SENTRY_ENEABLED_FORCE, BACKEND_VERSION } from './src/shared/config/env.ts'

Sentry.init({
  dsn: SENTRY_URL,
  environment: NODE_ENV,
  enabled: isDevEnv || isProdEnv || SENTRY_ENEABLED_FORCE,
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  replaysOnErrorSampleRate: 1.0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  maxBreadcrumbs: 15,

  normalizeDepth: 100,

  initialScope: {
    tags: {
      version: PROJECT_VERSION,
      last_build_time: new Date(PROJECT_LAST_BUILD_DATE).toLocaleString(),
      backendVersion: BACKEND_VERSION
    },
  },

  // You can remove this option if you're not planning to use the Sentry Session Replay feature:
  integrations: [
    new Sentry.Replay({
      // Additional Replay configuration goes in here, for example:
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],

  async beforeSend(event) {
    //Обработка логирование до отправки
    return event
  },
})
