import React, { useState } from 'react'
import { Rect } from 'react-konva'

export function ShapeList(props) {
  return props.shapeList.map(shape => {
    if (shape.type === 'rect') {
      return <Rect {...shape} key={shape.id} draggable />
    }
  })
}
