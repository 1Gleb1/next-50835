import { Story, Meta } from '@storybook/react'
import { TruncateContainer, TruncateContainerProps } from './truncate-container'

export default {
  title: 'Shared/TruncateContainer',
  component: TruncateContainer,
  args: {
    maxWidth: 190,
  },
} as Meta

const Template: Story<TruncateContainerProps> = args => <TruncateContainer {...args}>Info Text</TruncateContainer>

export const Default = Template.bind({})
Default.args = {}
