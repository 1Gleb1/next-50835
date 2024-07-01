import { NODE_ENV } from '../config'
import { BASE_URL } from '../config'
import { isProdEnv } from '../config'
import * as Sentry from '@sentry/nextjs'

//fake url нужен, если сентри лежит на том же домене, что и апи и сентри
//в логах срезает его
export const FAKE_BASE_URL = 'https://api.fake-url.ru'

export function getSentryEnvironment(): string {
  switch (NODE_ENV) {
    case 'test':
      return 'test'
    case 'local':
      return 'local'
    case 'development':
      return 'dev'
    case 'production':
      return 'prod'
  }
  return 'prod'
}

export function formatBreadcrumbsToFakeDomainInProd(breadcrumb: Sentry.Breadcrumb): Sentry.Breadcrumb {
  if (isProdEnv && breadcrumb.category === 'xhr' && breadcrumb?.data?.url) {
    const splittedUrl = breadcrumb.data.url.split(BASE_URL)
    breadcrumb.data.url = FAKE_BASE_URL + splittedUrl[1]
    return breadcrumb
  }
  return breadcrumb
}

//нужно добавить ссылки для двух доменов, поэтому проходим два раза
//пока не изсправится восприятие запросов в сентри
//добавлять нужные и заблокированные префиксы в массивы networkDetailAllowUrlsPrefixes и networkDetailDenyUrlsPrefixes
const networkDetailAllowUrlsPrefixes = ['']

export const networkDetailAllowUrls = [
  ...networkDetailAllowUrlsPrefixes.map(urlPrefix => BASE_URL + urlPrefix),
  ...networkDetailAllowUrlsPrefixes.map(urlPrefix => FAKE_BASE_URL + urlPrefix),
]

// const networkDetailDenyUrlsPrefixes = [] as string[]

export const networkDetailDenyUrls = [
  // ...networkDetailDenyUrlsPrefixes?.map(urlPrefix => BASE_URL + urlPrefix),
  // ...networkDetailDenyUrlsPrefixes?.map(urlPrefix => FAKE_BASE_URL + urlPrefix),
]
