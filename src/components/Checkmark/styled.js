import styled, { keyframes } from 'styled-components'

const revealCheckmark = keyframes`
  from { width: 50px; }
  to { width: 0; }
`

export const Container = styled.div`
  position: relative;
`

export const ImageRevealer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 50px;
  height: 100px;
  background-color: white;
  transform: rotateY(180deg);
  animation: ${revealCheckmark} 1s linear forwards;
`

export const Image = styled.img`
  width: 40%;
`
