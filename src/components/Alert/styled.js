import styled from 'styled-components'
import COLORS from '../../constants/colors'

export const Container = styled.div`
  padding: 20px;
  border: 1px solid ${COLORS.blue};
  max-width: 300px;
  text-align: center;
  margin: auto;
`

export const Message = styled.p`
  color: ${COLORS.blue};
  margin: 0 auto 50px auto;
`

export const Button = styled.div`
  cursor: pointer;
  text-align: center;
  border: 1px solid ${COLORS.blue};
  color: ${COLORS.blue};
  font-size: 20px;
  padding: 10px 0;
  width: 80%;
  margin: 0 auto;
`
