import React from 'react'
import styled from 'styled-components'

import StyledToolbarBtn from '../styled-btn'
import { S } from '../../../shape-name'

const StyledEllipse = styled.div`
  width: 14px;
  height: 14px;
  border: 2px solid #333;
  border-radius: 10px;
  background: #fff
`

export function TbShapeEllipse(props) {
  function handleClick() {
    props.onClick(S.ELLIPSE)
  }

  return (
    <StyledToolbarBtn onClick={handleClick}>
      <StyledEllipse />
    </StyledToolbarBtn>
  )
}
