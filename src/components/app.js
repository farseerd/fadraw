import React, { useState, useEffect } from 'react'
import { Stage, Layer } from 'react-konva'
import { merge } from 'lodash'
import uuidv4 from 'uuid/v4'

import baseConf from '../config'
import * as Event from '../utils/event'
import { BackgroundImage } from './background'
import { ShapeList } from './shape-list'

export function App(props) {
  const [layerScale, setLayerScale] = useState(baseConf.layer.scale.initial)
  const [layerPos, setLayerPos] = useState({ x: 0, y: 0 })
  const [shapeList, setShapeList] = useState([])

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

  useEffect(() => {
    function handleAddRect(opt) {
      setShapeList([...shapeList, merge({ id: uuidv4() }, baseConf.shape.rect, opt)])
    }
    Event.on('add:rect', handleAddRect)
    return () => { Event.off('add:rect') }
  })

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
          <ShapeList shapeList={shapeList} />
        </Layer>
      </Stage>
    </div>
  )
}
