/* @flow */
import React from 'react'
import { Container, ImageRevealer, Image } from './styled'
import checkmark from '../../assets/icons/checkmark.svg'

const Checkmark = () => (
  <Container>
    <ImageRevealer />
    <Image src={checkmark} />
  </Container>
)

export default Checkmark
