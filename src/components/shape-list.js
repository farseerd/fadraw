import React, { useState } from 'react'
import { Rect } from 'react-konva'
import { S } from '../shape-name'

export function ShapeList(props) {
  function handleClick(e, shape) {
    props.onClickShape(shape, e.target)
  }

  function updateShape(e, shape) {
    props.onUpdateShape(shape.id, e.target)
  }

  return props.shapeList.map(shape => {
    if (shape.type === S.RECT) {
      return (
        <Rect
          {...shape}
          key={shape.id}
          draggable
          onClick={e => handleClick(e, shape)}
          onDragStart={e => handleClick(e, shape)}
          onDragMove={e => updateShape(e, shape)}
          onDragEnd={e => updateShape(e, shape)}
        />
      )
    }
  })
}
