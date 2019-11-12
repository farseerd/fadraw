import React, { useState } from 'react'
import { Group, Rect } from 'react-konva'
import uuidv4 from 'uuid/v4'
import key from 'keymaster'

import { S } from '../../shape-name'
import { sin, cos, rotate, transScalePos, deTransScalePos } from '../../utils'
import baseConf from '../../config'

const resizePointMap = {
  'left-top': { cursor: 'nwse-resize' },
  top: { cursor: 'ns-resize' },
  'right-top': { cursor: 'nesw-resize' },
  right: { cursor: 'ew-resize' },
  'right-bottom': { cursor: 'nwse-resize' },
  bottom: { cursor: 'ns-resize' },
  'left-bottom': { cursor: 'nesw-resize' },
  left: { cursor: 'ew-resize' }
}

const ROTATE_CIRCLE_OFFSET = 30
const RESIZE_MIN_SIZE = 30

let currentCtx = null

export function ResizePoint(props) {
  let { shape, context, name, layerInfo, onUpdateShape } = props

  function getContextInfo() {
    return {
      x: context.x(),
      y: context.y(),
      r: context.rotation(),
      w: context.width(),
      h: context.height(),
      ox: context.offsetX(),
      oy: context.offsetY(),
      id: shape.id
    }
  }

  function handleResizeMouseOver(e) {
    document.body.style.cursor = resizePointMap[e.target.name()].cursor
  }

  function handleResizeMouseOut() {
    document.body.style.cursor = 'default'
  }

  function handleResizeDragStart() {
    currentCtx = context.clone()
  }

  function handleResizeDragEnd() {
    currentCtx = null
  }

  // override default drag bound func
  function handleResizeDragBound(pos) {
    if (!currentCtx) {
      return pos
    }

    pos = transScalePos(pos, layerInfo)
    let { x, y, w, h, r, ox, oy } = getContextInfo(currentCtx)
    let [cosR, sinR] = [cos(r), sin(r)]
    if (/\-/.test(name)) {
      let nw, nh, sp
      if (name == 'left-top') {
        sp = rotate({ x: x + ox, y: y + oy }, { x, y }, r)
        nw = (sp.x - pos.x) * cosR + (sp.y - pos.y) * sinR
        nh = (sp.y - pos.y) * cosR - (sp.x - pos.x) * sinR
        if (nw < RESIZE_MIN_SIZE || nh < RESIZE_MIN_SIZE) {
          nw = Math.max(RESIZE_MIN_SIZE, nw)
          nh = Math.max(RESIZE_MIN_SIZE, nh)
          pos.x = sp.x - nw * cosR + nh * sinR
          pos.y = sp.y - nw * sinR - nh * cosR
        }
        if (key.shift) {
          ;[nw, nh] = [Math.min(nw, (nh / h) * w), Math.min(nh, (nw / w) * h)]
          pos.x = sp.x - nw * cosR + nh * sinR
          pos.y = sp.y - nw * sinR - nh * cosR
        }
      } else if (name == 'right-top') {
        sp = rotate({ x: x - ox, y: y + oy }, { x, y }, r)
        nw = -(sp.x - pos.x) * cosR - (sp.y - pos.y) * sinR
        nh = (sp.y - pos.y) * cosR - (sp.x - pos.x) * sinR
        if (nw < RESIZE_MIN_SIZE || nh < RESIZE_MIN_SIZE) {
          nw = Math.max(RESIZE_MIN_SIZE, nw)
          nh = Math.max(RESIZE_MIN_SIZE, nh)
          pos.x = sp.x + nw * cosR + nh * sinR
          pos.y = sp.y + nw * sinR - nh * cosR
        }
        if (key.shift) {
          ;[nw, nh] = [Math.min(nw, (nh / h) * w), Math.min(nh, (nw / w) * h)]
          pos.x = sp.x + nw * cosR + nh * sinR
          pos.y = sp.y + nw * sinR - nh * cosR
        }
      } else if (name == 'right-bottom') {
        sp = rotate({ x: x - ox, y: y - oy }, { x, y }, r)
        nw = -(sp.x - pos.x) * cosR - (sp.y - pos.y) * sinR
        nh = -(sp.y - pos.y) * cosR + (sp.x - pos.x) * sinR
        if (nw < RESIZE_MIN_SIZE || nh < RESIZE_MIN_SIZE) {
          nw = Math.max(RESIZE_MIN_SIZE, nw)
          nh = Math.max(RESIZE_MIN_SIZE, nh)
          pos.x = sp.x + nw * cosR - nh * sinR
          pos.y = sp.y + nw * sinR + nh * cosR
        }
        if (key.shift) {
          ;[nw, nh] = [Math.min(nw, (nh / h) * w), Math.min(nh, (nw / w) * h)]
          pos.x = sp.x + nw * cosR - nh * sinR
          pos.y = sp.y + nw * sinR + nh * cosR
        }
      } else if (name == 'left-bottom') {
        sp = rotate({ x: x + ox, y: y - oy }, { x, y }, r)
        nw = (sp.x - pos.x) * cosR + (sp.y - pos.y) * sinR
        nh = -(sp.y - pos.y) * cosR + (sp.x - pos.x) * sinR
        if (nw < RESIZE_MIN_SIZE || nh < RESIZE_MIN_SIZE) {
          nw = Math.max(RESIZE_MIN_SIZE, nw)
          nh = Math.max(RESIZE_MIN_SIZE, nh)
          pos.x = sp.x - nw * cosR - nh * sinR
          pos.y = sp.y - nw * sinR + nh * cosR
        }
        if (key.shift) {
          ;[nw, nh] = [Math.min(nw, (nh / h) * w), Math.min(nh, (nw / w) * h)]
          pos.x = sp.x - nw * cosR - nh * sinR
          pos.y = sp.y - nw * sinR + nh * cosR
        }
      }
      context.setAttrs({
        width: nw,
        height: nh,
        x: (pos.x + sp.x) / 2,
        y: (pos.y + sp.y) / 2,
        offset: {
          x: nw / 2,
          y: nh / 2
        }
      })
    } else {
      let d,
        nw = w,
        nh = h,
        tp = rotate({ x, y: y - oy }, { x, y }, r),
        bp = rotate({ x, y: y + oy }, { x, y }, r),
        lp = rotate({ x: x - ox, y }, { x, y }, r),
        rp = rotate({ x: x + ox, y }, { x, y }, r),
        cosR = cos(r),
        sinR = sin(r)
      if (name == 'top') {
        d =
          ((tp.x - x) * pos.y - (tp.y - y) * pos.x - (y * tp.x - tp.y * x)) /
          Math.sqrt((tp.x - x) ** 2 + (tp.y - y) ** 2)
        pos = { x: pos.x - d * cosR, y: pos.y - d * sinR }
        nh =
          oy -
          ((rp.x - x) * pos.y - (rp.y - y) * pos.x - (y * rp.x - rp.y * x)) /
            Math.sqrt((rp.x - x) ** 2 + (rp.y - y) ** 2)
        if (nh < RESIZE_MIN_SIZE) {
          nh = RESIZE_MIN_SIZE
          pos = { x: bp.x + nh * sinR, y: bp.y - nh * cosR }
        }
        context.setAttrs({
          width: nw,
          height: nh,
          x: (pos.x + bp.x) / 2,
          y: (pos.y + bp.y) / 2,
          offset: {
            x: nw / 2,
            y: nh / 2
          }
        })
      } else if (name == 'right') {
        d =
          ((rp.x - x) * pos.y - (rp.y - y) * pos.x - (y * rp.x - rp.y * x)) /
          Math.sqrt((rp.x - x) ** 2 + (rp.y - y) ** 2)
        pos = { x: pos.x + d * sinR, y: pos.y - d * cosR }
        nw =
          ox -
          ((bp.x - x) * pos.y - (bp.y - y) * pos.x - (y * bp.x - bp.y * x)) /
            Math.sqrt((bp.x - x) ** 2 + (bp.y - y) ** 2)
        if (nw < RESIZE_MIN_SIZE) {
          nw = RESIZE_MIN_SIZE
          pos = { x: lp.x + nw * cosR, y: lp.y + nw * sinR }
        }
        context.setAttrs({
          width: nw,
          height: nh,
          x: (pos.x + lp.x) / 2,
          y: (pos.y + lp.y) / 2,
          offset: {
            x: nw / 2,
            y: nh / 2
          }
        })
      } else if (name == 'bottom') {
        d =
          ((bp.x - x) * pos.y - (bp.y - y) * pos.x - (y * bp.x - bp.y * x)) /
          Math.sqrt((bp.x - x) ** 2 + (bp.y - y) ** 2)
        pos = { x: pos.x + d * cosR, y: pos.y + d * sinR }
        nh =
          oy +
          ((rp.x - x) * pos.y - (rp.y - y) * pos.x - (y * rp.x - rp.y * x)) /
            Math.sqrt((rp.x - x) ** 2 + (rp.y - y) ** 2)
        if (nh < RESIZE_MIN_SIZE) {
          nh = RESIZE_MIN_SIZE
          pos = { x: tp.x - nh * sinR, y: tp.y + nh * cosR }
        }
        context.setAttrs({
          width: nw,
          height: nh,
          x: (pos.x + tp.x) / 2,
          y: (pos.y + tp.y) / 2,
          offset: {
            x: nw / 2,
            y: nh / 2
          }
        })
      } else if (name == 'left') {
        d =
          ((lp.x - x) * pos.y - (lp.y - y) * pos.x - (y * lp.x - lp.y * x)) /
          Math.sqrt((lp.x - x) ** 2 + (lp.y - y) ** 2)
        pos = { x: pos.x - d * sinR, y: pos.y + d * cosR }
        nw =
          ox +
          ((bp.x - x) * pos.y - (bp.y - y) * pos.x - (y * bp.x - bp.y * x)) /
            Math.sqrt((bp.x - x) ** 2 + (bp.y - y) ** 2)
        if (nw < RESIZE_MIN_SIZE) {
          nw = RESIZE_MIN_SIZE
          pos = { x: rp.x - nw * cosR, y: rp.y - nw * sinR }
        }
        context.setAttrs({
          width: nw,
          height: nh,
          x: (pos.x + rp.x) / 2,
          y: (pos.y + rp.y) / 2,
          offset: {
            x: nw / 2,
            y: nh / 2
          }
        })
      }
    }
    onUpdateShape(shape.id, context)
    return deTransScalePos(pos, layerInfo)
  }

  let { x, y, r, ox, oy } = getContextInfo()
  let point = { x, y }
  if (/left/.test(name)) {
    point.x -= ox
  } else if (/right/.test(name)) {
    point.x += ox
  }
  if (/top/.test(name)) {
    point.y -= oy
  } else if (/bottom/.test(name)) {
    point.y += oy
  }

  point = {
    ...baseConf.anchor,
    ...point,
    id: uuidv4(),
    name,
    rotation: r,
    ...rotate({ x: point.x, y: point.y }, { x, y }, r)
  }

  return (
    <Rect
      {...point}
      draggable
      dragBoundFunc={handleResizeDragBound}
      onDragStart={handleResizeDragStart}
      onDragEnd={handleResizeDragEnd}
      onMouseOver={handleResizeMouseOver}
      onMouseOut={handleResizeMouseOut}
    />
  )
}
