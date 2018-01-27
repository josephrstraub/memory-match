/* @flow */
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 50px;
  text-align: center;
  border: 1px solid ${props => props.theme.blue};
  border-radius: 5px 5px;
  margin: 20px auto 40px auto;
`

const Text = styled.h2`
  margin: 0;
  color: ${props => props.theme.blue};
  font-weight: normal;
`

type Props = {
  display: string
}

const Clock = (props: Props) => (
  <Container>
    <Text>{props.display}</Text>
  </Container>
)

export default Clock
