import styled, { keyframes } from 'styled-components'
import COLORS from '../../../constants/colors'

const revealBack = keyframes`
  from { transform: rotateY(0deg); }
  to { transform: rotateY(180deg); }
`
const revealFront = keyframes`
  from { transform: rotateY(180deg); }
  to { transform: rotateY(0deg); }
`
export const theme = {
  back: {
    animation: `${revealBack} 500ms linear forwards`
  },
  front: {
    animation: `${revealFront} 500ms linear forwards`
  }
}

export const Container = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  animation: ${props => props.theme.animation};
  transform-style: preserve-3d;
  perspective: 1000px;
  margin: 5px;
`

const Tile = styled.div`
  cursor: pointer;
  position: absolute;
  width: 100px;
  height: 100px;
  backface-visibility: hidden;
`

export const Front = Tile.extend`
  background-color: ${COLORS.blue};
  z-index: 1;
`

export const Back = Tile.extend`
  background-color: white;
  transform: rotateY(180deg);
  border: 1px solid ${COLORS.blue};
`
