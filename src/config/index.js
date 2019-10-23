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
      min: 0.1,
      step: 0.05
    }
  },
  scaleWhenWheel: true,
  background: 'https://s2.ax1x.com/2019/09/29/u8VZ28.png',
  shape
}
