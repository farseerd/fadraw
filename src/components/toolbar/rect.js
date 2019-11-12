import React from 'react'
import StyledToolbarBtn from './styled-btn'
import { S } from '../../shape-name'

export function ToolBarRect(props) {
  function handleClick() {
    props.onClick(S.RECT)
  }

  return (
    <StyledToolbarBtn onClick={handleClick}>
      <svg
        t="1572518193410"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2083"
        width="20"
        height="20"
      >
        <path
          d="M128 853.333333h768a42.666667 42.666667 0 0 0 42.666667-42.666666V213.333333a42.666667 42.666667 0 0 0-42.666667-42.666666H128a42.666667 42.666667 0 0 0-42.666667 42.666666v597.333334a42.666667 42.666667 0 0 0 42.666667 42.666666zM170.666667 256h682.666666v512H170.666667V256z"
          fill="#333333"
          p-id="2084"
        ></path>
      </svg>
    </StyledToolbarBtn>
  )
}
