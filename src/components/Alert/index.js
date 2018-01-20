/* @flow */
import React from 'react'
import styled from 'styled-components'

type Props = {
  buttonText: string,
  handleDismiss: Function,
  message: string
}

const Container = styled.div`
  padding: 20px;
  border: 1px solid ${props => props.theme.blue};
  max-width: 300px;
  text-align: center;
  margin: auto;
`

const Message = styled.p`
  color: ${props => props.theme.blue};
  margin: 0 auto 50px auto;
`

export const Button = styled.div`
  text-align: center;
  border: 1px solid ${props => props.theme.blue};
  color: ${props => props.theme.blue};
  font-size: 20px;
  padding: 10px 0;
  width: 80%;
  margin: 0 auto;
`

const Alert = (props: Props) => (
  <Container>
    <Message>{props.message}</Message>
    <Button onClick={props.handleDismiss}>{props.buttonText}</Button>
  </Container>
)

export default Alert
