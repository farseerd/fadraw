import React, { useState, useEffect } from 'react'
import { StyledIcWrap } from './styled.js'

const MIN_EDGE = 3
const MAX_EDGE = 10

export function Counter(props) {
  const [value, setValue] = useState(MIN_EDGE)
  function handleAdd() {
    if (value < MAX_EDGE) {
      setValue(value + 1)
    }
  }

  function handleSub() {
    if (value > MIN_EDGE) {
      setValue(value - 1)
    }
  }

  useEffect(() => {
    props.onChange(value)
  })

  return (
    <StyledIcWrap>
      <div className="ic">
        <div className="ic__label">Edges of polygon:</div>
        <div className="ic__counter">
          <div
            className={
              'ic__counter-btn' + (value <= MIN_EDGE ? ' is-disabled' : '')
            }
            onClick={handleSub}
          >
            -
          </div>
          <div className="ic__counter-number">{value}</div>
          <div
            className={
              'ic__counter-btn ic__counter-btn--right' +
              (value >= MAX_EDGE ? ' is-disabled' : '')
            }
            onClick={handleAdd}
          >
            +
          </div>
        </div>
      </div>
    </StyledIcWrap>
  )
}
