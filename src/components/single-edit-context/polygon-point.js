import React from 'react'
import { Circle } from 'react-konva'

import baseConf from '../../config'

export function PolygonPoint(props) {
  let { shape, context, px, py, index, onUpdateShape, layerInfo } = props
  function handleDragBound(pos) {
    let points = context.points()
    points[2 * index] = pos.x - shape.x
    points[2 * index + 1] = pos.y - shape.y
    context.points(points)
    onUpdateShape(shape.id, context)
    return pos
  }
  return (
    <Circle
      {...baseConf.rotate.circle}
      x={px + shape.x}
      y={py + shape.y}
      draggable={true}
      dragBoundFunc={handleDragBound}
    />
  )
}
