import styled from 'styled-components'

export default styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.3s;
  & > * {
    opacity: 0.6;
    transition: 0.3s;
  }
  &:hover {
    background: #eee;
    & > * {
      opacity: 1;
    }
  }
`
