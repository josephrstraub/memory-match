/* @flow */
import React from 'react'
import styled, { ThemeProvider, keyframes } from 'styled-components'

const rotate360 = keyframes`
  from {
    transform: rotateY(0deg);
  }

  to {
    transform: rotateY(180deg);
  }
`
const theme = (rootTheme) => ({
  back: {
    ...rootTheme,
    animation: `${rotate360} 2s linear forwards`
  },
  front: {
    ...rootTheme,
    animation: `${rotate360} 2s linear forwards`
  }
})

const Container = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  animation: ${props => props.theme.animation};
  transform-style: preserve-3d;
  perspective: 1000px;
`

const Front = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: ${props => props.theme.blue};
  z-index: 1;
  backface-visibility: hidden;
`

const Back = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: white;
  transform: rotateY(180deg);
  backface-visibility: hidden;
  border: 1px solid ${props => props.theme.blue};
`

type Props = {
  backFaceIsVisible: boolean
}

const Tile = (props: Props) => (
  <ThemeProvider theme={(rootTheme) => theme(rootTheme)[props.backFaceIsVisible ? 'back' : 'front']}>
    <Container>
      <Front />
      <Back />
    </Container>
  </ThemeProvider>
)

export default Tile
