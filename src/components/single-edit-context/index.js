import React, { useState } from 'react'
import { Group, Rect } from 'react-konva'
import uuidv4 from 'uuid/v4'

import { S } from '../../shape-name'
import { ResizePoint } from './resize-point'

export function SingleEditCtx(props) {
  let { shape } = props

  if (shape.type === S.RECT) {
    return (
      <Group>
        {/* {this.getRotateLine()} */}
        <ResizePoint name="left-top" {...props} />
        <ResizePoint name="top" {...props} />
        <ResizePoint name="right-top" {...props} />
        <ResizePoint name="right" {...props} />
        <ResizePoint name="right-bottom" {...props} />
        <ResizePoint name="bottom" {...props} />
        <ResizePoint name="left-bottom" {...props} />
        <ResizePoint name="left" {...props} />
        {/* {this.getRotatePoint()} */}
      </Group>
    )
  }
  return null
}
