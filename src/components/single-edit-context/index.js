import React from 'react'
import { Group } from 'react-konva'

import { S } from '../../shape-name'
import { ResizePoint } from './resize-point'
import { RotatePoint } from './rotate-point'

export function SingleEditCtx(props) {
  let { shape } = props

  if (shape.type === S.RECT) {
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
  }
  return null
}
