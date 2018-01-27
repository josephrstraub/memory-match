/* @flow */
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Container, Front, Back, theme } from './styled'

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
