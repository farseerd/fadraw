import React from 'react'
import { Group } from 'react-konva'

import { S } from '../../shape-name'
import { ResizePoint } from './resize-point'
import { RotatePoint } from './rotate-point'
import { PolygonPoint } from './polygon-point'

export function SingleEditCtx(props) {
  let { shape } = props

  if (shape.type === S.RECT || shape.type === S.ELLIPSE) {
    return (
      <Group>
        <RotatePoint {...props} />
        <ResizePoint name="left-top" {...props} />
        <ResizePoint name="top" {...props} />
        <ResizePoint name="right-top" {...props} />
        <ResizePoint name="right" {...props} />
        <ResizePoint name="right-bottom" {...props} />
        <ResizePoint name="bottom" {...props} />
        <ResizePoint name="left-bottom" {...props} />
        <ResizePoint name="left" {...props} />
      </Group>
    )
  } else if (shape.type === S.POLYGON) {
    let Points = []
    for (let i = 0; i < shape.points.length / 2; i++) {
      Points.push(
        <PolygonPoint
          {...props}
          px={shape.points[2 * i]}
          py={shape.points[2 * i + 1]}
          key={i}
          index={i}
        />
      )
    }
    return <Group>{Points}</Group>
  }
  return null
}
