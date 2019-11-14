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
      setInnerClose(false)
      props.onClose()
    }, 200)
  }

  function handleCancel() {
    close()
  }

  function handleConfirm() {
    props.onConfirm()
    close()
  }

  function handleClickInner(e) {
    e.stopPropagation()
  }

  return (
    <StyledDialog>
      <StyledMask className={innerClose ? 'mask-close' : ''} />
      <StyledDialogWrap onClick={handleCancel}>
        <StyledDialogInner
          onClick={handleClickInner}
          style={{
            width: `${props.width || '60%'}`,
            height: `${props.height || '60%'}`
          }}
          className={innerClose ? 'dialog-close' : ''}
        >
          <div style={{ position: 'relative' }}>{props.children}</div>
          <DialogBtns onCancel={handleCancel} onConfirm={handleConfirm} />
        </StyledDialogInner>
      </StyledDialogWrap>
    </StyledDialog>
  )
}
