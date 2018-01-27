import styled from 'styled-components'

export const Container = styled.div`
  padding: 20px;
  border: 1px solid ${props => props.theme.blue};
  max-width: 300px;
  text-align: center;
  margin: auto;
`

export const Message = styled.p`
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
