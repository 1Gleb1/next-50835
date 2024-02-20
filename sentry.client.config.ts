// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'
import JSzip from 'jszip'
import {
  networkDetailAllowUrls,
  networkDetailDenyUrls,
  formatBreadcrumbsToFakeDomainInProd,
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
    flushAtStartup: false,
    /**
     * Called before an event is stored.
     * Return false to drop the envelope rather than store it.
     *
     * @param envelope The envelope that failed to send.
     * @param error The error that occurred.
     * @param retryDelay The current retry delay in milliseconds.
     */
    // shouldStore: (envelope: Envelope, error: Error, retryDelay: number) => boolean | Promise<boolean>;
  },

  // Если 0 - не записывает видео с ошибками
  // Если 1 - записывает видео только с ошибками
  replaysOnErrorSampleRate: 0,

  // Если 0 - не записывает видео всей сессии
  // Если 1 - записывает видео всей пользовательской сессии
  replaysSessionSampleRate: 1,

  maxBreadcrumbs: 15,

  // You can remove this option if you're not planning to use the Sentry Session Replay feature:
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
    return formatBreadcrumbsToFakeDomainInProd(breadcrumb)
  },

  async beforeSend(event, hint) {
    const order = event.contexts?.put_body || event.contexts?.order
    if (order) {
      // @ts-expect-error
      order?.database?.wells?.forEach(well => {
        well.shafts?.forEach(shaft => {
          shaft?.documents?.forEach(document => {
            document.base64 && (document.base64 = true)
          })
          shaft?.mediaFiles?.forEach(mediaFile => {
            mediaFile.base64 && (mediaFile.base64 = true)
          })
        })
      })
    }

    /***
     * Все данные в объекте context относящиеся к заявке будут заархивированы и отправленны в sentry, как attachments
     ***/
    const attachment = {}

    for (const contextKey in event.contexts) {
      if (/order/i.test(contextKey)) {
        attachment[contextKey] = event.contexts[contextKey]
        delete event.contexts[contextKey]
      }
    }

    if (Object.keys(attachment).length) {
      const zip = new JSzip()
      zip.file('orders.zip', JSON.stringify(attachment))
      await zip.generateAsync({ type: 'uint8array' }).then(content => {
        hint.attachments = [...(hint.attachments || []), { filename: 'orders.zip', data: content }]
      })
    }

    if (event.user) {
      delete event.user?.roles
    }

    if (!hint.originalException && event.message) {
      hint.originalException = event.message
    }

    return event
  },
})
