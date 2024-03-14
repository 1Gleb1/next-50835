import {
    isProdEnv,
    SENTRY_DSN,
    isDevEnv,
    SENTRY_ENABLED_FORCE,
    PROJECT_VERSION,
    PROJECT_LAST_BUILD_DATE,
  } from './src/shared/config/env'
  import { getSentryEnvironment } from './src/shared/helpers'
  
  export const sentryBaseConfig = {
    dsn: SENTRY_DSN,
    environment: getSentryEnvironment(),
    enabled: isDevEnv || isProdEnv || SENTRY_ENABLED_FORCE,
  
    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 1,
  
    normalizeDepth: 100,
  
    initialScope: {
      tags: {
        version: PROJECT_VERSION,
        last_build_time: new Date(PROJECT_LAST_BUILD_DATE).toLocaleString(),
      },
    },
  
    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,
  }
  