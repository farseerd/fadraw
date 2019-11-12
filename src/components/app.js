import React, { useState, useEffect } from 'react'
import { Stage, Layer } from 'react-konva'
import { merge, clamp } from 'lodash'
import uuidv4 from 'uuid/v4'
import styled from 'styled-components'

import baseConf from '../config'
import * as Event from '../utils/event'
import { Toolbar } from './toolbar'
import { BackgroundImage } from './background'
import { ShapeList } from './shape-list'
import { SingleEditCtx } from './single-edit-context'

const StyledApp = styled.div`
  touch-action: none;
  position: relative;
  overflow: hidden;
  width: ${baseConf.stage.width}px;
  height: ${baseConf.stage.height + 30}px;
  border: 1px solid #ddd;
`

const defaultShapeList = []
const shapeMap = {}

export function App(props) {
  const [layerScale, setLayerScale] = useState(baseConf.layer.scale.initial)
  const [layerPos, setLayerPos] = useState({ x: 0, y: 0 })
  const [shapeList, setShapeList] = useState(defaultShapeList)
  const [isShowSingleEditCtx, setShowSingleEditCtx] = useState(false)
  const [singleEditCtxShape, setSingleEditCtxShape] = useState(null)
  const [singleEditCtxOri, setSingleEditCtxOri] = useState(null)

  // keep scale layer at fixed mouse position when wheeling
  function handleZoomStage(e) {
    e.preventDefault()
    e = e.nativeEvent

    let { x, y } = layerPos
    let [ex, ey] = [e.offsetX, e.offsetY]

    let newScale = layerScale
    if (e.wheelDeltaY > 0 && layerScale < baseConf.layer.scale.max) {
      newScale += baseConf.layer.scale.step
    } else if (e.wheelDeltaY < 0 && layerScale > baseConf.layer.scale.min) {
      newScale -= baseConf.layer.scale.step
    } else {
      return
    }

    x = ex - ((ex - x) * newScale) / layerScale
    y = ey - ((ey - y) * newScale) / layerScale

    setLayerScale(newScale)
    setLayerPos({ x, y })
  }

  function handleAddShape(type, opt) {
    let addedShape = merge({ id: uuidv4() }, baseConf.shape[type], opt)
    shapeMap[addedShape.id] = addedShape
    setShapeList([...shapeList, addedShape])
  }

  function setSingleEditCtx(shape, context) {
    setSingleEditCtxShape(shape)
    setSingleEditCtxOri(context)
    setShowSingleEditCtx(true)
  }

  function handleUpdateShape(shapeId, context) {
    ;['x', 'y', 'rotation', 'width', 'height', 'offset', 'rotation'].map(k => {
      shapeMap[shapeId][k] = context[k]()
    })
    setShapeList([...shapeList])
  }

  function handleClickBg() {
    setShowSingleEditCtx(false)
  }

  return (
    <StyledApp onWheel={baseConf.scaleWhenWheel ? handleZoomStage : null}>
      <Toolbar onAddShape={handleAddShape}></Toolbar>
      <Stage width={props.stage.width} height={props.stage.height}>
        <Layer
          scale={{ x: layerScale, y: layerScale }}
          position={layerPos}
          draggable
        >
          <BackgroundImage
            width={props.stage.width}
            height={props.stage.height}
            onClick={handleClickBg}
          />
          <ShapeList
            shapeList={shapeList}
            onClickShape={setSingleEditCtx}
            onUpdateShape={handleUpdateShape}
          />
          {isShowSingleEditCtx ? (
            <SingleEditCtx
              shape={singleEditCtxShape}
              context={singleEditCtxOri}
              layerInfo={{ ...layerPos, scale: layerScale }}
              onUpdateShape={handleUpdateShape}
            />
          ) : null}
        </Layer>
      </Stage>
    </StyledApp>
  )
}
