export function error(msg) {
  console.error(`[Fadraw error] ${msg}`)
}

export function cos(x) {
  return Math.cos((x / 180) * Math.PI)
}

export function sin(x) {
  return Math.sin((x / 180) * Math.PI)
}

export function rotate(point, zeroPoint, r) {
  let [oldX, oldY] = [point.x, point.y]
  let [x, y] = [zeroPoint.x, zeroPoint.y]
  let [cosR, sinR] = [cos(r), sin(r)]
  return {
    x: x - (x - oldX) * cosR + (y - oldY) * sinR,
    y: y - (y - oldY) * cosR - (x - oldX) * sinR
  }
}

// trasform real position to canvas position
export function transScalePos(pos, stageInfo) {
	return {
		x: (pos.x - stageInfo.x) / stageInfo.scale,
		y: (pos.y - stageInfo.y) / stageInfo.scale
	}
}

// trans canvas position to real position
export function deTransScalePos(pos, stageInfo) {
	return {
		x: pos.x * stageInfo.scale + stageInfo.x,
		y: pos.y * stageInfo.scale + stageInfo.y
	}
}