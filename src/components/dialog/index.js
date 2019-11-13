import React, { useState } from 'react'
import {
  StyledDialog,
  StyledMask,
  StyledDialogWrap,
  StyledDialogInner
} from './styled'
import { DialogBtns } from './buttons'

export function Dialog(props) {
  const [innerClose, setInnerClose] = useState(false)

  function close() {
    setInnerClose(true)
    setTimeout(() => {
      props.onClose()
      setInnerClose(false)
    }, 200)
  }

  function handleCancel() {
    close()
  }

  function handleConfirm() {
    close()
  }

  function handleClickInner(e) {
    e.stopPropagation()
  }

  if (!props.show) {
    return null
  }

  return (
    <StyledDialog>
      <StyledMask className={innerClose ? 'mask-close' : ''} />
      <StyledDialogWrap onClick={handleCancel}>
        <StyledDialogInner onClick={handleClickInner} style={{height: `${props.height || 60}%`}} className={innerClose ? 'dialog-close' : ''}>
          <div>
            {props.children}
          </div>
          <DialogBtns onCancel={handleCancel} onConfirm={handleConfirm} />
        </StyledDialogInner>
      </StyledDialogWrap>
    </StyledDialog>
  )
}
