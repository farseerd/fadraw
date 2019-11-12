import React from 'react'
import { Rect } from 'react-konva'
import useImage from 'use-image'
import baseConf from '../config'

export function BackgroundImage(props) {
  if (baseConf.background) {
    const [image] = useImage(baseConf.background)
    return <Rect {...props} fillPatternImage={image} fillPatternRepeat="repeat" />
  }
  return null
}