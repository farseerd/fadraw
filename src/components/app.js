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
import { S } from '../shape-name'
import { InputCounter } from './input-counter'

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
  const [showInputCounter, setShowInputCounter] = useState(false)

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
    if ([S.RECT, S.ELLIPSE].includes(type)) {
      let addedShape = merge(
        { id: uuidv4() },
        baseConf.shape[type],
        { opacity: baseConf.normalOpacity },
        opt
      )
      shapeMap[addedShape.id] = addedShape
      setShapeList([...shapeList, addedShape])
    } else if (type === S.POLYGON) {
      setShowInputCounter(true)
    }
  }

  function handleInputCounterConfirm(edge) {
    let addedShape = merge(
      { id: uuidv4() },
      baseConf.shape[S.POLYGON](edge),
      { opacity: baseConf.normalOpacity }
    )
    shapeMap[addedShape.id] = addedShape
    setShapeList([...shapeList, addedShape])
  }

  function setSingleEditCtx(shape, context) {
    clearSingleEditCtx()
    shapeMap[shape.id].opacity = baseConf.selectedOpacity
    setShapeList([...shapeList])
    setSingleEditCtxShape(shape)
    setSingleEditCtxOri(context)
    setShowSingleEditCtx(true)
  }

  function handleUpdateShape(shapeId, context) {
    ;['x', 'y', 'rotation', 'width', 'height', 'offset', 'rotation', 'points'].map(k => {
      shapeMap[shapeId][k] = context[k]()
    })
    setShapeList([...shapeList])
  }

  function clearSingleEditCtx() {
    setShowSingleEditCtx(false)
    shapeList.forEach(o => (o.opacity = baseConf.normalOpacity))
    setShapeList([...shapeList])
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
            onClick={clearSingleEditCtx}
          />
          <ShapeList
            currentSingleEditShape={singleEditCtxShape}
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
      <InputCounter
        show={showInputCounter}
        onHide={e => setShowInputCounter(false)}
        onConfirm={handleInputCounterConfirm}
      />
    </StyledApp>
  )
}
