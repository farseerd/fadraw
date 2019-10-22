import React, { useState } from 'react'
import { Stage, Layer, Rect, Text, Image } from 'react-konva'

import baseConf from '../config'
import { BackgroundImage } from './background'
import { ShapeList } from './shape-list'

export function App(props) {
  const [layerScale, setLayerScale] = useState(baseConf.layer.scale.initial)
  const [layerPos, setLayerPos] = useState({ x: 0, y: 0 })

  // keep scale layer at fixed mouse position when wheeling
  function handleZoomStage(e) {
    e.preventDefault()
    e = e.nativeEvent

    let { x, y } = layerPos
    let [ex, ey] = [e.offsetX, e.offsetY]

    let newScale = layerScale
    if (e.wheelDeltaY > 0 && layerScale <= baseConf.layer.scale.max) {
      newScale += baseConf.layer.scale.step
    } else if (e.wheelDeltaY < 0 && layerScale >= baseConf.layer.scale.min) {
      newScale -= baseConf.layer.scale.step
    } else {
      return
    }

    x = ex - ((ex - x) * newScale) / layerScale
    y = ey - ((ey - y) * newScale) / layerScale

    setLayerScale(newScale)
    setLayerPos({ x, y })
  }

  return (
    <div
      style={{ touchAction: 'none' }}
      onWheel={baseConf.scaleWhenWheel ? handleZoomStage : null}
    >
      <Stage width={props.stage.width} height={props.stage.height}>
        <Layer
          scale={{ x: layerScale, y: layerScale }}
          position={layerPos}
          draggable
        >
          <BackgroundImage />
          <ShapeList />
        </Layer>
      </Stage>
    </div>
  )
}
