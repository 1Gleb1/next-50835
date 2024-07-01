import { queryFetchFactory } from '@/shared/lib'
import { AppVersion, APP_VERSION_SINGLE_TARGET } from '../lib'

export const queryFetchAppVersion = queryFetchFactory<AppVersion>(APP_VERSION_SINGLE_TARGET)
