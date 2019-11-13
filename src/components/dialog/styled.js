import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const zoomIn = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`

export const StyledDialog = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
`

export const StyledMask = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.6);
  transition: .2s;
  opacity: 1;
  animation: ${fadeIn} .2s;
  &.mask-close {
    opacity: 0;
  }
`

export const StyledDialogWrap = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const StyledDialogInner = styled.div`
  width: 60%;
  height: 60%;
  position: absolute;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  animation: ${zoomIn} .2s;
  transition: .2s;
  &.dialog-close {
    transform: scale(0);
  }
`