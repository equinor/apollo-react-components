import { Icon, TopBar } from '@equinor/eds-core-react'
import { apps, IconData } from '@equinor/eds-icons'
import { ReactNode } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: 0;
  .--content {
    flex: 1;
  }
`

export interface AppShellProps {
  children?: ReactNode
  icon?: IconData
  title?: string
}

export const AppShell = ({ children, icon, title }: AppShellProps) => (
  <Wrapper>
    <TopBar>
      <TopBar.Header>
        <Icon data={icon ?? apps} />
        <span>{title ?? 'App Title'}</span>
      </TopBar.Header>
    </TopBar>
    <div className="--content">{children}</div>
  </Wrapper>
)
