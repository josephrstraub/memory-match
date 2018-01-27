import styled, { keyframes } from 'styled-components'

const revealBack = keyframes`
  from { transform: rotateY(0deg); }
  to { transform: rotateY(180deg); }
`
const revealFront = keyframes`
  from { transform: rotateY(180deg); }
  to { transform: rotateY(0deg); }
`
export const theme = (rootTheme) => ({
  back: {
    ...rootTheme,
    animation: `${revealBack} 500ms linear forwards`
  },
  front: {
    ...rootTheme,
    animation: `${revealFront} 500ms linear forwards`
  }
})

export const Container = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  animation: ${props => props.theme.animation};
  transform-style: preserve-3d;
  perspective: 1000px;
  margin: 5px;
`

export const Front = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: ${props => props.theme.blue};
  z-index: 1;
  backface-visibility: hidden;
`

export const Back = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: white;
  transform: rotateY(180deg);
  backface-visibility: hidden;
  border: 1px solid ${props => props.theme.blue};
`
