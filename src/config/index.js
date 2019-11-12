import shape from './shape'

export default {
  stage: {
    width: 800,
    height: 600
  },
  layer: {
    scale: {
      initial: 1,
      max: 10,
      min: 1,
      step: 0.05
    }
  },
  scaleWhenWheel: true,
  background:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpEOTkxNUZBQ0Y0OUUxMUU5QjM5NkMzOTY4NDRCQzE1MSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpEOTkxNUZBREY0OUUxMUU5QjM5NkMzOTY4NDRCQzE1MSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjFCODAxRDdGRjQ5QjExRTlCMzk2QzM5Njg0NEJDMTUxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjFCODAxRDgwRjQ5QjExRTlCMzk2QzM5Njg0NEJDMTUxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+QrTY7QAAACxJREFUeNpifPfu3X8GJCAoKMiIzGdiIAAoV8D4/z+KExjev3//n85uAAgwAEwvCtXSeiIFAAAAAElFTkSuQmCC',
  shape,
  anchor: {
    fill: '#ffffff',
    stroke: '#333333',
    strokeWidth: 1,
    width: 8,
    height: 8,
    offset: {
      x: 4,
      y: 4
    }
  },
  rotate: {
    circle: {
      radius: 5,
      fill: '#ffffff',
      stroke: '#666666',
      strokeWidth: 1
    },
    line: {
      x: 0,
      y: 0,
      stroke: '#999999'
    },
    offset: 20
  },
  selectedOpacity: 1,
  normalOpacity: 0.7
}
