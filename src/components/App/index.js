/* @flow */
import * as React from 'react'
import { ThemeProvider } from 'styled-components'
import Alert from '../Alert'

export const theme = {
  blue: '#359DED'
}

type State = {
  gameIsActive: boolean,
  tiles: []
}

class App extends React.Component<State> {
  constructor() {
    super()
    this.state = { gameIsActive: false }
  }

  startGame: Function = (event) => {
    event.preventDefault()
    this.setState({
      gameIsActive: true,
      tiles: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]
    })
  }

  render() {
    const message = 'Click a square to reveal it, then find its match. Finish before time runs out!'
    return (
      <ThemeProvider theme={theme}>
        <div>
          { !this.state.gameIsActive && (
            <Alert buttonText="Got it!" handleDismiss={this.startGame} message={message} />
          )}
        </div>
      </ThemeProvider>
    )
  }
}

export default App
