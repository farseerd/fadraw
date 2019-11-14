import { S } from '../shape-name'

export default {
  [S.RECT]: {
    type: S.RECT,
    x: 100,
    y: 100,
    width: 100,
    height: 100,
    offsetX: 50,
    offsetY: 50,
    fill: '#2680ef',
    stroke: '#00ff00',
    strokeWidth: 0
  },
  [S.ELLIPSE]: {
    type: S.ELLIPSE,
    x: 100,
    y: 100,
    width: 100,
    height: 100,
    offsetX: 0,
    offsetY: 0,
    fill: '#2680ef',
    stroke: '#00ff00',
    strokeWidth: 0
  },
  [S.POLYGON](edge) {
    const R = 50
    let points = []
    for (let i = 0; i < edge; i++) {
      let theta = ((Math.PI * 2) / edge) * i + (Math.PI / edge) * (1 - edge % 2)
      points.push(R * Math.sin(theta), -R * Math.cos(theta))
    }
    return {
      type: S.POLYGON,
      x: 100,
      y: 100,
      offsetX: 0,
      offsetY: 0,
      points,
      fill: '#2680ef',
      stroke: '#00ff00',
      strokeWidth: 0
    }
  }
}
