import { FC } from '@/shared/@types'
import { TrancateContainer } from '@/shared/ui'
import Circle from '@/shared/assets/icons/common/circle.svg'
import cn from 'classnames'
import { Tooltip } from '@/shared/ui'
import { useAppVersion } from '../../model'
import { useState } from 'react'
import { isProdEnv, PROJECT_VERSION, BACKEND_VERSION, PROJECT_LAST_BUILD_DATE } from '@/shared/config'
import { parseCookies, setCookie } from 'nookies'
import { useTranslate } from '@/shared/lib'

export const ProjectVersionPanel: FC = ({ className }) => {
  const { t } = useTranslate(['common'])
  const [isVersionMatch, setIsVersionMatch] = useState(false)
  const { data } = useAppVersion({
    enabled: !parseCookies().backendVersion,
    onSuccess: data => {
      if (data.backendAppVersion === BACKEND_VERSION) setIsVersionMatch(true)
      setCookie(null, 'backendVersion', data.backendAppVersion)
    },
  })
  const tooltipText = isVersionMatch    
    ? t('The compatible and current versions of the backend are the same')
    : data?.backendAppVersion ? 
        `${t('The compatible version and the current version do not match (current -')}${
            data?.backendAppVersion
        })`
        : t('No data of current backend version')

  if (isProdEnv) return <></>
  console.log(isVersionMatch)

  return (
    <div
      className='fixed bottom-4 left-4'
    >
      <div className='pl-5'>{`v${PROJECT_VERSION}`}</div>
      <div className={cn('flex gap-2 items-center', className)}>
        <Tooltip
          label={tooltipText}
          className='text-center max-w-[250px]'
        >
          <Circle
            className={cn({
              'fill-red': !isVersionMatch,
              'fill-green': isVersionMatch,
            })}
          />
        </Tooltip>
        <TrancateContainer maxWidth={120}>{`backend:${BACKEND_VERSION}`}</TrancateContainer>
      </div>
      <div >
        {t('last build date:') + new Date(PROJECT_LAST_BUILD_DATE).toLocaleString(PROJECT_LAST_BUILD_DATE)}
      </div>
    </div>
  )
}
