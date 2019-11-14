import React from 'react'
import StyledToolbarBtn from '../styled-btn'
import { S } from '../../../shape-name'

export function TbShapePolygon(props) {
  function handleClick() {
    props.onClick(S.POLYGON)
  }

  return (
    <StyledToolbarBtn onClick={handleClick}>
      <svg
        width="100%"
        height="100%"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 22 L8 13 L20 7 L22 22 Z"
          style={{ fill: 'white', stroke: '#333333', strokeWidth: 2 }}
        />
      </svg>
    </StyledToolbarBtn>
  )
}
