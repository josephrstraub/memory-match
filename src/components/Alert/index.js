/* @flow */
import React from 'react'
import { Container, Message, Button } from './styled'

type Props = {
  buttonText: string,
  handleDismiss: Function,
  message: string
}

const Alert = (props: Props) => (
  <Container>
    <Message>{props.message}</Message>
    <Button onClick={props.handleDismiss}>{props.buttonText}</Button>
  </Container>
)

export default Alert
