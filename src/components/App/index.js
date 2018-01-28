/* @flow */
import * as React from 'react'
import _ from 'lodash'
import Alert from '../Alert'
import Clock from '../Clock'
import Tiles from '../Tiles'
import iconNames from '../../constants/icon-names'

type State = {
  gameIsActive: boolean,
  intervalId: any,
  numberOfVisibleUnmatchedTiles: number,
  roundsCompleted: 0,
  tiles: [],
  timeRemaining: number
}

class App extends React.Component<State> {
  constructor() {
    super()
    this.state = {
      gameIsActive: false,
      intervalId: null,
      numberOfVisibleUnmatchedTiles: 0,
      roundsCompleted: 0,
      tiles: [],
      timeRemaining: 40
    }
  }

  componentDidUpdate: Function = () => {
    if (this.state.timeRemaining === 0 && this.state.gameIsActive) {
      this.setState({ gameIsActive: false })
      clearInterval(this.state.intervalId)
    }
  }

  checkForRoundCompletion: Function = () => {
    if (this.state.tiles.every(tile => tile.isMatched)) {
      this.endRound()
    }
  }

  endRound: Function = () => {
    clearInterval(this.state.intervalId)
    this.setState(
      { gameIsActive: false, roundsCompleted: this.state.roundsCompleted + 1 },
      this.startGame
    )
  }

  getNumberOfTiles: Function = (roundsCompleted: number) => {
    if (roundsCompleted < 3) {
      return 12
    }
    if (roundsCompleted >= 6) {
      return 30
    }
    return 20
  }

  getRoundDuration: Function = (roundsCompleted: number) => {
    const NUMBER_OF_TIERS = 3
    const MINIMUM_DURATION = 5
    if (roundsCompleted > 8) {
      return Math.max(28 - roundsCompleted, MINIMUM_DURATION)
    }
    const tier = (roundsCompleted % NUMBER_OF_TIERS) + 1
    if (tier === 1) {
      return 40
    } else if (tier === 2) {
      return 30
    }
    return 20
  }

  handleTileClick: Function = (selectedTile: Object, index: number) => {
    if (!selectedTile.backFaceIsVisible && this.state.numberOfVisibleUnmatchedTiles !== 2) {
      const isMatched = this.state.tiles.some(tile => tile.id === selectedTile.id
        && tile.backFaceIsVisible
      )
      this.setState(
        {
          numberOfVisibleUnmatchedTiles: this.state.numberOfVisibleUnmatchedTiles + 1,
          tiles: this.state.tiles.map((tile, i) => ({
            ...tile,
            backFaceIsVisible: i === index || tile.backFaceIsVisible,
            isMatched: tile.isMatched || tile.id === selectedTile.id && isMatched
          }))
        },
        () => {
          if (this.state.numberOfVisibleUnmatchedTiles === 2) {
            this.checkForRoundCompletion()
            setTimeout(this.resetTurn, 2000)
          }
        }
      )
    }
  }

  resetTurn: Function = () => {
    this.setState({
      numberOfVisibleUnmatchedTiles: 0,
      tiles: this.state.tiles.map(tile => ({
        ...tile,
        backFaceIsVisible: tile.isMatched
      }))
    })
  }

  startGame: Function = (roundsCompleted = this.state.roundsCompleted) => {
    const numberOfDistinctIcons = this.getNumberOfTiles(roundsCompleted) / 2
    this.setState(
      {
        gameIsActive: true,
        roundsCompleted,
        tiles: _.shuffle(iconNames)
          .slice(0, numberOfDistinctIcons)
          .reduce((tiles, iconName, index) => {
            return [
              ...tiles,
              { id: index, iconName, backFaceIsVisible: false, isMatched: false },
              { id: index, iconName, backFaceIsVisible: false, isMatched: false }
            ]
          }, []),
        timeRemaining: this.getRoundDuration(roundsCompleted)
      },
      () => {
        const intervalId = setInterval(
          () => this.setState({ timeRemaining: this.state.timeRemaining - 1 }),
          1000
        )
        this.setState({ intervalId })
      }
    )
  }

  render() {
    const defaultMessage = 'Click a square to reveal it, then find its match. Finish before time runs out!'
    const statsMessage = `Good effort. You completed ${this.state.roundsCompleted} rounds.`

    return (
      <div>
        <Clock display={this.state.timeRemaining} />
        <div>
          { !this.state.gameIsActive && (
            <Alert
              buttonText={this.state.roundsCompleted ? 'Go again' : 'Got it!'}
              handleDismiss={(event) => {
                event.preventDefault()
                this.startGame(0)
              }}
              message={this.state.roundsCompleted ? statsMessage : defaultMessage}
            />
          )}
        </div>
        { this.state.gameIsActive
            && <Tiles tiles={this.state.tiles} handleTileClick={this.handleTileClick} />
        }
      </div>
    )
  }
}

export default App
