import * as NextImage from 'next/image'
import { i18n } from './i18next.js'
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'
import { initialize, mswDecorator } from 'msw-storybook-addon'
import { storybookHandlers as handlers } from '@/app/mocks-server/handlers'
import { withProviders } from '@/app/providers'
import '@/app/index.css'

const OriginalNextImage = NextImage.default

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  i18n,
  locale: 'en',
  locales: {
    en: 'English',
    ru: 'Russian',
  },
  msw: {
    handlers,
  },
}

initialize({
  onUnhandledRequest: 'bypass',
})

export const decorators = [
  mswDecorator,
  Story => {
    const App = withProviders(() => (
      <MemoryRouterProvider>
        <Story />
      </MemoryRouterProvider>
    ))
    return <App />
  },
]

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: props => <OriginalNextImage {...props} unoptimized />,
})
