import { Icon, TopBar } from '@equinor/eds-core-react'
import { apps, IconData } from '@equinor/eds-icons'
import { ReactNode } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  height: 100vh;
  .--content-wrapper {
    display: flex;
    flex: 1;
  }
  .--content-outlet {
    flex: 1;
  }
`

export interface AppShellProps {
  children?: ReactNode
  sidebar?: ReactNode
  icon?: IconData
  title?: string
}

export const AppShell = ({ children, icon, title, sidebar }: AppShellProps) => (
  <Wrapper>
    <TopBar sticky={false}>
      <TopBar.Header>
        <Icon data={icon ?? apps} />
        <span>{title ?? 'App Title'}</span>
      </TopBar.Header>
    </TopBar>
    <div className="--content-wrapper">
      {sidebar}
      <div className="--content-outlet">{children}</div>
    </div>
  </Wrapper>
)
