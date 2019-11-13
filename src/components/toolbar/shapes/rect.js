import React from 'react'
import styled from 'styled-components'

import StyledToolbarBtn from '../styled-btn'
import { S } from '../../../shape-name'

const StyledRect = styled.div`
  width: 12px;
  height: 12px;
  border: 2px solid #333;
`

export function TbShapeRect(props) {
  function handleClick() {
    props.onClick(S.RECT)
  }

  return (
    <StyledToolbarBtn onClick={handleClick}>
      <StyledRect />
    </StyledToolbarBtn>
  )
}
