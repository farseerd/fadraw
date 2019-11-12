import React from 'react'
import styled from 'styled-components'

import { ToolBarRect } from './rect'

const StyledToolbar = styled.div`
  width: 100%;
  height: 30px;
  left: 0;
  top: 0;
  background: white;
  border-bottom: 1px solid #ddd;
`

export function Toolbar(props) {
  function handleAddShape(type) {
    props.onAddShape(type)
  }

  return (
    <StyledToolbar>
      <ToolBarRect onClick={handleAddShape}/>
    </StyledToolbar>
  )
}
