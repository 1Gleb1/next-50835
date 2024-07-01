import { FC } from '@/shared/@types'
import { TruncateContainer, Tooltip } from '@/shared/ui'
import Circle from '@/shared/assets/icons/common/circle.svg'
import cn from 'classnames'
import { useAppVersion } from '../../model'
import { useState } from 'react'
import { isProdEnv, BACKEND_VERSION, PROJECT_VERSION, PROJECT_LAST_BUILD_DATE } from '@/shared/config'
import { parseCookies, setCookie } from 'nookies'
import { useTranslate } from '@/shared/lib'

export interface VersionerProps {
  needDate?: boolean
}

export const Versioner: FC<VersionerProps> = ({ className, needDate }) => {
  const { t } = useTranslate(['common'])
  const [isVersionMatch, setIsVersionMatch] = useState(true)
  const { data } = useAppVersion({
    // вернуть, когда добавится запрос на бекенде
    // enabled: !parseCookies().backendVersion,
    enabled: false,
    onSuccess: data => {
      if (data.backendAppVersion != BACKEND_VERSION) setIsVersionMatch(false)
      setCookie(null, 'backendVersion', data.backendAppVersion, { maxAge: 60 * 5 })
    },
  })
  const currentBackendVersion = data?.backendAppVersion || parseCookies().backendVersion

  return (
    <div className={cn('pb-4', className)}>
      <div className='pl-5'>{`v${PROJECT_VERSION}`}</div>
      {!isProdEnv && currentBackendVersion && (
        <div className='flex gap-2 items-center'>
          <Tooltip
            label={
              isVersionMatch
                ? t('The compatible and current versions of the backend are the same')
                : `${t('Developped on backend version')}:${BACKEND_VERSION}`
            }
            className='text-center max-w-[250px]'
          >
            <Circle
              className={cn({
                'fill-red': !isVersionMatch,
                'fill-green': isVersionMatch,
              })}
            />
          </Tooltip>
          <TruncateContainer maxWidth={120}>{`b:${currentBackendVersion}`}</TruncateContainer>
        </div>
      )}
      {needDate && <div className='pl-5'>{PROJECT_LAST_BUILD_DATE}</div>}
    </div>
  )
}
