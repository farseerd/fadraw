import styled from 'styled-components'

export default styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: .3s;
  svg {
    opacity: .6;
    transition: .3s;
  }
  &:hover {
    background: #eee;
    svg {
      opacity: 1;
    }
  }
`