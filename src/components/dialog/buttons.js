import React, { useState } from 'react'
import styled from 'styled-components'

const StyledBtnWrap = styled.div`
  width: 100%;
  position: absolute;
  bottom: 20px;
  display: flex;
  justify-content: center;
`

const StyledBtn = styled.button`
  width: 80px;
  height: 24px;
  line-height: 24px;
  font-size: 12px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #606266;
  cursor: pointer;
  transition: 0.3s;
  margin-right: 20px;
  user-select: none;
  outline: none;
  &:last-child {
    margin-right: 0;
  }
  &:hover {
    background: #eee;
    color: #333;
  }
`
const StyledPrimaryBtn = styled(StyledBtn)`
  background: #2680ef;
  border-color: #2680ef;
  color: #fff;
  &:hover {
    background: #4096ff;
    color: #fff;
  }
`

export function DialogBtns(props) {
  function handleCancel() {
    if (props.onCancel) props.onCancel()
  }

  function handleConfirm() {
    if (props.onConfirm) props.onConfirm()
  }

  return (
    <StyledBtnWrap>
      <StyledBtn onClick={handleCancel}>Cancel</StyledBtn>
      <StyledPrimaryBtn onClick={handleConfirm}>OK</StyledPrimaryBtn>
    </StyledBtnWrap>
  )
}
