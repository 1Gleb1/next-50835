import { composeStories } from '@storybook/testing-react'
import { render } from '@/jest/utils'
import * as stories from './truncate-container.stories'

const { Default } = composeStories(stories)

describe('TruncateContainerTests', () => {
  it('TruncateContainer should be render', () => {
    render(<Default />)
  })
})
