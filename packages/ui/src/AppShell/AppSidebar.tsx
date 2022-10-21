import { Button, Icon } from '@equinor/eds-core-react'
import { first_page, last_page } from '@equinor/eds-icons'
import { tokens } from '@equinor/eds-tokens'
import { useState } from 'react'
import styled, { css } from 'styled-components'

const Wrapper = styled.div<{ collapsed?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${(props) => (props.collapsed ? '64px' : '192px')};
  height: 100%;
  background-color: ${tokens.colors.ui.background__default.hex};
  border-right: 2px solid ${tokens.colors.ui.background__medium.hex};

  .collapse-button-wrapper {
    display: flex;
    align-items: center;
    height: 64px;
    border-bottom: 1px solid ${tokens.colors.ui.background__medium.hex};
    ${(props) => props.collapsed && 'justify-content: center;'}
  }
  .collapse-button {
    ${(props) =>
      !props.collapsed &&
      css`
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin: 0 12px;
        border-radius: 50px;
      `}
  }
`

export interface AppSidebarProps {
  title?: string
}

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Wrapper collapsed={collapsed}>
      <div className="collapse-button-wrapper">
        <Button
          className="collapse-button"
          variant={collapsed ? 'ghost_icon' : 'ghost'}
          onClick={() => setCollapsed(!collapsed)}
        >
          <Icon data={collapsed ? last_page : first_page} />
          {!collapsed && <div>Collapse</div>}
        </Button>
      </div>
    </Wrapper>
  )
}
