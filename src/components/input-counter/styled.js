import styled from 'styled-components'

export const StyledIcWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .ic {
    width: 200px;
    padding-top: 30px;
    .ic__label {
      font-size: 12px;
      color: #606266;
    }
    .ic__counter {
      margin-top: 8px;
      display: flex;
      height: 30px;
      color: #606266;
      .ic__counter-btn {
        width: 40px;
        text-align: center;
        line-height: 26px;
        flex-shrink: 0;
        border: 1px solid #ccc;
        border-radius: 6px 0 0 6px;
        user-select: none;
        cursor: pointer;
        transition: 0.3s;
        &.ic__counter-btn--right {
          border-radius: 0 6px 6px 0;
        }
        &.is-disabled {
          cursor: default;
          opacity: 0.4;
        }
        &:not(.is-disabled):hover {
          background: #eee;
          color: #333;
        }
      }
      .ic__counter-number {
        width: 100%;
        text-align: center;
        line-height: 28px;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
      }
    }
  }
`