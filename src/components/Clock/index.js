/* @flow */
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Container, Text, themes } from './styled'

type Props = {
  display: number | Node,
  theme?: string
}
const defaultProps = {
  theme: 'default'
}

const Clock = (props: Props) => {
  let Display
  if (typeof props.display === 'function') {
    Display = props.display
  }

  return (
    <ThemeProvider theme={themes[props.theme]}>
      <Container>
        {
          typeof props.display === 'number'
            ? <Text>{props.display}</Text>
            : <Display />
        }
      </Container>
    </ThemeProvider>
  )
}

Clock.defaultProps = defaultProps

export default Clock
