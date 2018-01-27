/* @flow */
import React from 'react'
import { Container, Text } from './styled'

type Props = {
  display: string
}

const Clock = (props: Props) => (
  <Container>
    <Text>{props.display}</Text>
  </Container>
)

export default Clock
