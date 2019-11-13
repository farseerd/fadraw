import { S } from '../shape-name'

export function getContextInfo(shape, context) {
  return {
    x: context.x(),
    y: context.y(),
    r: context.rotation(),
    w: context.width(),
    h: context.height(),
    ox: shape.type === S.ELLIPSE ? context.width() / 2 : context.offsetX(),
    oy: shape.type === S.ELLIPSE ? context.height() / 2 : context.offsetY(),
    id: shape.id
  }
}
