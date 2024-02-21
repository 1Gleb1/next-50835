import { APP_VERSION_PRIMARY_KEY, AppVersion } from '../lib'
import { queryFactory, QueryParams } from '@/shared/lib'
import { queryFetchAppVersion } from './requests'
import { useRouter } from 'next/router'

const appVersionQuery = () =>
  queryFactory(
    APP_VERSION_PRIMARY_KEY,
    queryFetchAppVersion
  )(filters => ({
    params: filters,
  }))

export const useAppVersion = (params?: QueryParams<AppVersion>) => {
  const { locale } = useRouter()

  return appVersionQuery().useHookInitializer({
    ...params,
    filters: {
      locale,
      ...params?.filters,
    },
  })
}
