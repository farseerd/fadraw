import React, { useState, useEffect } from 'react'

import { Dialog } from '../dialog'
import { Counter } from './counter'

export function InputCounter(props) {
  let count

  function handleClose() {
    props.onHide()
  }

  function handleChange(value) {
    count = value
  }

  function handleConfirm() {
    props.onConfirm(count)
  }

  if (!props.show) return null
  return (
    <Dialog onClose={handleClose} onConfirm={handleConfirm} width="300px" height="160px">
      <Counter onChange={handleChange} />
    </Dialog>
  )
}
