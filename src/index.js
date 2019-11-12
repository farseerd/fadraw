import React from 'react'
import { render } from 'react-dom'
import { merge } from 'lodash'

import baseConf from './config'
import { error } from './utils'
import { App } from './components/app'

export default class Fadraw {
  constructor(userOpt) {
    if (!userOpt.el) {
      error('must have `el` option')
      return
    }

    const el = document.querySelector(userOpt.el)
    if (!el) {
      error(`cannot find dom \`${userOpt.el}\``)
      return
    }

    const opt = merge({}, baseConf, userOpt)
    render(<App {...opt} />, el)
  }
}
