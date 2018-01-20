/* @flow */
import * as React from 'react'
import _ from 'lodash'
import styled, { ThemeProvider } from 'styled-components'
import Alert from '../Alert'
import Tile from '../Tile'
import iconNames from '../../constants/icons-names'

export const theme = {
  blue: '#359DED'
}

const TileContainer = styled.div`
  margin: auto;
  max-width: 440px;
  display: inline-flex;
  flex-wrap: wrap;
`

type State = {
  gameIsActive: boolean,
  tiles: []
}

class App extends React.Component<State> {
  constructor() {
    super()
    this.state = {
      gameIsActive: false,
      numberOfVisibleTiles: 0,
      tiles: []
    }
  }

  handleTileClick: Function = (selectedTile, index) => {
    if (!selectedTile.backFaceIsVisible) {
      const isMatched = this.state.tiles.some(tile => tile.id === selectedTile.id
        && tile.backFaceIsVisible
      )
      this.setState(
        {
          numberOfVisibleTiles: this.state.numberOfVisibleTiles + 1,
          tiles: this.state.tiles.map((tile, i) => ({
            ...tile,
            backFaceIsVisible: i === index || tile.backFaceIsVisible,
            isMatched: tile.isMatched || tile.id === selectedTile.id && isMatched
          }))
        },
        () => {
          if (this.state.numberOfVisibleTiles === 2) {
            this.resetTurn()
          }
        }
      )
    }
  }

  resetTurn: Function = () => {
    this.setState({
      numberOfVisibleTiles: 0,
      tiles: this.state.tiles.map(tile => ({
        ...tile,
        backFaceIsVisible: tile.isMatched
      }))
    })
  }

  startGame: Function = (event) => {
    event.preventDefault()
    this.setState({
      gameIsActive: true,
      tiles: _.shuffle(iconNames).slice(0, 6).reduce((tiles, iconName, index) => {
        return [
          ...tiles,
          { id: index, iconName, backFaceIsVisible: false, isMatched: false },
          { id: index, iconName, backFaceIsVisible: false, isMatched: false }
        ]
      }, [])
    })
  }

  render() {
    const message = 'Click a square to reveal it, then find its match. Finish before time runs out!'
    return (
      <ThemeProvider theme={theme}>
        <div>
          <div>
            { !this.state.gameIsActive && (
              <Alert buttonText="Got it!" handleDismiss={this.startGame} message={message} />
            )}
          </div>
          <TileContainer>
            { this.state.gameIsActive && this.state.tiles.map((tile, index) => (
              <Tile
                key={index}
                backFaceIsVisible={tile.backFaceIsVisible}
                handleClick={() => this.handleTileClick(tile, index)}
                iconName={tile.iconName}
              />
            ))}
          </TileContainer>
        </div>
      </ThemeProvider>
    )
  }
}

export default App
