import React, { useState } from 'react'
import { Rect, Ellipse } from 'react-konva'
import { S } from '../shape-name'

export function ShapeList(props) {
  let current = props.currentSingleEditShape
  function handleClick(e, shape) {
    props.onClickShape(shape, e.target)
  }

  function updateShape(e, shape) {
    props.onUpdateShape(shape.id, e.target)
  }

  let list = props.shapeList.filter(shape =>
    current ? current.id !== shape.id : true
  )
  // make sure that current editing context is always on the top
  if (current) {
    list.push(props.shapeList.find(shape => current.id === shape.id))
  }

  return list.map(shape => {
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
    } else if (shape.type === S.ELLIPSE) {
      return (
        <Ellipse
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
