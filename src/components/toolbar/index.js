import React from 'react'
import styled from 'styled-components'

import { TbShapeRect } from './shapes/rect'
import { TbShapeEllipse } from './shapes/ellipse'

const StyledToolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
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
      <TbShapeRect onClick={handleAddShape}/>
      <TbShapeEllipse onClick={handleAddShape}/>
    </StyledToolbar>
  )
}
