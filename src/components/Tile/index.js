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
    animation: `${rotate360} 500ms linear forwards`
  },
  front: {
    ...rootTheme
  }
})

const Container = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  animation: ${props => props.theme.animation};
  transform-style: preserve-3d;
  perspective: 1000px;
  margin: 5px;
`

const Front = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: ${props => props.theme.blue};
  z-index: 1;
  backface-visibility: hidden;
`

const Back = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: white;
  transform: rotateY(180deg);
  backface-visibility: hidden;
  border: 1px solid ${props => props.theme.blue};
`

type Props = {
  backFaceIsVisible: boolean,
  handleClick: Function,
  iconName: string
}

const Tile = (props: Props) => (
  <div onClick={props.handleClick}>
    <ThemeProvider theme={(rootTheme) => theme(rootTheme)[props.backFaceIsVisible ? 'back' : 'front']}>
      <Container>
        <Front />
        <Back>
          <img src={`${process.env.PUBLIC_URL}/icons/${props.iconName}.svg`} />
        </Back>
      </Container>
    </ThemeProvider>
  </div>
)

export default Tile
