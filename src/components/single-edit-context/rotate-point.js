import React, { useState } from 'react'
import { Group, Line, Circle } from 'react-konva'

import baseConf from '../../config'
import { rotate, transScalePos, deTransScalePos } from '../../utils'
import { S } from '../../shape-name'
import { getContextInfo } from '../common'

const _fixAtanInfo = {}

export function RotatePoint(props) {
  let { shape, context, onUpdateShape, layerInfo } = props
  if (!context) return null

  function handleRotateMouseOver(e) {
    document.body.style.cursor = 'pointer'
  }

  function handleRotateMouseOut() {
    document.body.style.cursor = 'default'
  }

  function rotatePointDragBoundFunc(pos) {
		pos = transScalePos(pos, layerInfo)
		let { x, y, r, ox, oy, id } = getContextInfo(shape, context)

		// fix arctan
		if (!_fixAtanInfo[id]) {
			_fixAtanInfo[id] = {
				time: 0,
				last: 0
			}
		}
		let newR = Math.atan(-(pos.x - x) / (pos.y - y)) * 180 / Math.PI + 180 * _fixAtanInfo[id].time
		if (_fixAtanInfo[id].last && Math.abs(_fixAtanInfo[id].last - newR) >= 90) {
			newR += 180
			_fixAtanInfo[id].time++
		}
		_fixAtanInfo[id].last = newR

		onUpdateShape(shape.id, context.rotation(newR))

		let newPos = rotate(
			{
				x,
				y: y - oy - baseConf.rotate.offset
			},
			{ x, y },
			newR
		)

		return deTransScalePos(newPos, layerInfo)
	}

  let { x, y, r, ox, oy } = getContextInfo(shape, context)
  let p = rotate(
    {
      x,
      y: y - oy - baseConf.rotate.offset
    },
    { x, y },
    r
  )
  let q = rotate(
    {
      x,
      y: y - oy
    },
    { x, y },
    r
  )

  return (
    <Group>
      <Line {...baseConf.rotate.line} points={[p.x, p.y, q.x, q.y]} />
      <Circle
        {...baseConf.rotate.circle}
        {...p}
        onMouseOver={handleRotateMouseOver}
        onMouseOut={handleRotateMouseOut}
				draggable={true}
				dragBoundFunc={rotatePointDragBoundFunc}
      />
    </Group>
  )
}
