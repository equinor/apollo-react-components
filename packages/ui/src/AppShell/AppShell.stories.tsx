import { ComponentStoryFn, Meta } from '@storybook/react'
import { AppShell } from '.'

export default {
  title: 'App Shell/AppShell',
  component: AppShell,
} as Meta<typeof AppShell>

const Template: ComponentStoryFn<typeof AppShell> = () => <AppShell />
export const Primary = Template.bind({})
