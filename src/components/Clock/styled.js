import styled from 'styled-components'
import COLORS from '../../constants/colors'

export const themes = {
  default: {
    main: COLORS.blue
  },
  danger: {
    main: COLORS.red
  },
  success: {
    main: COLORS.green
  }
}

export const Container = styled.div`
  width: 50px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.main};
  border-radius: 5px 5px;
  margin: 20px auto 40px auto;
  overflow: hidden;
`

export const Text = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.main};
  font-weight: normal;
`
