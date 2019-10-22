import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image'
import baseConf from '../config'

export function BackgroundImage(props) {
  if (baseConf.background) {
    const [image] = useImage(baseConf.background)
    return <Image {...props} image={image} />
  }
  return null
}