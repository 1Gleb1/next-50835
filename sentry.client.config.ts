// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'
import {
networkDetailAllowUrls,
networkDetailDenyUrls,
} from './src/shared/helpers'
import { sentryBaseConfig } from './sentry.base.config'

Sentry.init({
...sentryBaseConfig,

//Настройка для сохранения логов сентри в оффлайн
transport: Sentry.makeBrowserOfflineTransport(Sentry.makeFetchTransport),
transportOptions: {
  /**
    * Name of IndexedDb database to store events
    */
  dbName: 'sentry-offline',
  /**
    * Name of IndexedDb object store to store events
    */
  storeName: 'queue',
  /**
    * Maximum number of events to store
    */
  maxQueueSize: 1000,
  /**
    * Flush the store shortly after startup.
    */
  flushAtStartup: true,
  /**
    * Called before an event is stored.
    * Return false to drop the envelope rather than store it.
    *
    * @param envelope The envelope that failed to send.
    * @param error The error that occurred.
    * @param retryDelay The current retry delay in milliseconds.
    */
  // shouldStore: (envelope: Envelope, error: Error, retryDelay: number) =>boolean | Promise<boolean>;
},

// Если 0 - не записывает видео с ошибками
// Если 1 - записывает видео только с ошибками
replaysOnErrorSampleRate: 0,

// Если 0 - не записывает видео всей сессии
// Если 1 - записывает видео всей пользовательской сессии
replaysSessionSampleRate: 1,

maxBreadcrumbs: 15,

// You can remove this option if you're not planning to use the Sentry SessionReplay feature:
integrations: [
  new Sentry.Replay({
    //Настройка для блокировки контента текст/инпутов/медиа
    // Разблокируем любые блокировки(из-за внутреннего контура - это безопасно)
    maskAllText: false,
    maskAllInputs: false,
    blockAllMedia: false,

    //Настройка отправка тела запросов
    networkDetailAllowUrls: networkDetailAllowUrls,
    networkDetailDenyUrls: networkDetailDenyUrls,
  }),
],

beforeBreadcrumb(breadcrumb) {
  return breadcrumb
  //если сентри лежит на том же домене, что и бекенд
  //без api. - то в логах отрежется домен и лог xhr превартиться в navigation
  //чтобы обойти подменяем домен
  // return formatBreadcrumbsToFakeDomainInProd(breadcrumb)
},

async beforeSend(event) {
  /***
    * Тут можно обработать евент перед логированием в сентри
    ***/
  return event
},
})