import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from './'
import Alert from '../Alert'
import { Button, Message } from '../Alert/styled'
import Tile from '../Tiles/Tile'

Enzyme.configure({ adapter: new Adapter() })

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('shows an alert once the component mounts', () => {
  const component = mount(<App />)
  expect(component.find(Alert).exists()).toEqual(true)
})

it('removes the alert once the user clicks the confirmation button', () => {
  const component = mount(<App />)
  component.find(Alert).find(Button).simulate('click')
  expect(component.find(Alert).exists()).toEqual(false)
})

it('starts the game once the user hits the confirmation button', () => {
  const component = mount(<App />)
  component.find(Alert).find(Button).simulate('click')
  expect(component.instance().state.gameIsActive).toEqual(true)
})

it('starts the game with 12 tiles', () => {
  const component = shallow(<App />)
  component.instance().startGame()
  expect(component.instance().state.tiles.length).toEqual(12)
})

it('should give an id to every tile', () => {
  const component = shallow(<App />)
  component.instance().startGame()
  const tiles = component.instance().state.tiles
  expect(tiles.every(tile => tile.hasOwnProperty('id'))).toEqual(true)
})

it('should match tiles in pairs of two using an id', () => {
  const component = shallow(<App />)
  component.instance().startGame()
  const tiles = component.instance().state.tiles
  const ids = { }
  tiles.forEach(tile => {
    if (ids[tile.id]) {
      ids[tile.id] += 1
    } else {
      ids[tile.id] = 1
    }
  })
  expect(Object.values(ids).every(value => value === 2)).toEqual(true)
})

it.skip('flips a tile when it is clicked', () => {
  const component = mount(<App />)
  component.instance().startGame()
  const spy = jest.spyOn(component.instance(), 'handleTileClick')
  component.first('.ahh').simulate('click')
  expect(spy).toHaveBeenCalled()
  // expect(component.instance().state.tiles[0].backFaceIsVisible).toEqual(true)
})

// it('does not flip a tile when it is clicked if the game is not active', () => {
//   const component = shallow(<App />)
//   component.instance().startGame()
//   component.instance().handleTileClick(0, 0)
// })

it('does not flip a tile when it is clicked if 2 tiles have already been revealed in the current turn', () => {
    const component = shallow(<App />)
    component.setState({
      numberOfVisibleUnmatchedTiles: 2,
      tiles: [
        { id: 0, backFaceIsVisible: true, isMatched: false },
        { id: 0, backFaceIsVisible: true, isMatched: false },
        { id: 1, backFaceIsVisible: false, isMatched: false }
      ]
    })
    component.instance().handleTileClick(
      component.instance().state.tiles[2],
      2
    )
    expect(component.instance().state.tiles[2].backFaceIsVisible).toEqual(false)
})

it('does not flip a tile when it is clicked if it is already visible', () => {
    const component = shallow(<App />)
    component.setState({
      tiles: [
        { id: 0, backFaceIsVisible: true }
      ]
    })
    component.instance().handleTileClick({ backFaceIsVisible: true }, 0)
    expect(component.instance().state.tiles[0].backFaceIsVisible).toEqual(true)
})

it('sets tiles as matched if user clicks two of the same tile', () => {
  const component = shallow(<App />)
  component.instance().startGame()
  component.setState({
    tiles: [
      { ...component.instance().state.tiles[0], id: 0 },
      { ...component.instance().state.tiles[1], id: 0 },
      ...component.instance().state.tiles.slice(2)
    ]
  })
  component.instance().handleTileClick(component.instance().state.tiles[0], 0)
  component.instance().handleTileClick(component.instance().state.tiles[1], 1)
  expect(component.instance().state.tiles[0].isMatched).toEqual(true)
  expect(component.instance().state.tiles[1].isMatched).toEqual(true)
})

it('ends the game if user fails to complete in allotted time', () => {
  const component = shallow(<App />)
  component.instance().startGame()
  component.setState({ timeRemaining: 0 })
  expect(component.instance().state.gameIsActive).toEqual(false)
})

it('shows user stats after failed round', () => {
  const component = mount(<App />)
  component.setState({ roundsCompleted: 3 })
  component.instance().startGame()
  component.update()
  component.setState({ timeRemaining: 0 })
  component.update()
  expect(component.find(Alert).find(Message).text()).toEqual('Good effort. You completed 3 rounds.')
})

it('allows for game to restart after failed round', () => {
  const component = mount(<App />)
  component.instance().startGame()
  component.setState({ timeRemaining: 0 })
  component.update()
  component.find(Alert).find(Button).simulate('click')
  expect(component.instance().state.gameIsActive).toEqual(true)
})

describe('getNumberOfTiles function', () => {
  it('returns 12 when given an input of 0', () => {
    const component = shallow(<App />)
    expect(component.instance().getNumberOfTiles(0)).toEqual(12)
  })
  it('returns 12 when given an input of 2', () => {
    const component = shallow(<App />)
    expect(component.instance().getNumberOfTiles(2)).toEqual(12)
  })
  it('returns 20 when given an input of 3', () => {
    const component = shallow(<App />)
    expect(component.instance().getNumberOfTiles(3)).toEqual(20)
  })
  it('returns 30 when given an input of 6', () => {
    const component = shallow(<App />)
    expect(component.instance().getNumberOfTiles(6)).toEqual(30)
  })
  it('returns 30 when given an input of 99', () => {
    const component = shallow(<App />)
    expect(component.instance().getNumberOfTiles(99)).toEqual(30)
  })
})

it('will count down from 3 to indicate the new round is beginning', () => {})

it('will not allow the user to flip any tiles prior to the game starting', () => {})

describe('getRoundDuration function', () => {
  it('returns 40 when given an input of 0', () => {
    const component = shallow(<App />)
    expect(component.instance().getRoundDuration(0)).toEqual(40)
  })
  it('returns 30 when given an input of 1', () => {
    const component = shallow(<App />)
    expect(component.instance().getRoundDuration(1)).toEqual(30)
  })
  it('returns 20 when given an input of 2', () => {
    const component = shallow(<App />)
    expect(component.instance().getRoundDuration(2)).toEqual(20)
  })
  it('returns 40 when given an input of 3', () => {
    const component = shallow(<App />)
    expect(component.instance().getRoundDuration(3)).toEqual(40)
  })
  it('returns 20 when given an input of 5', () => {
    const component = shallow(<App />)
    expect(component.instance().getRoundDuration(5)).toEqual(20)
  })
  it('returns 40 when given an input of 6', () => {
    const component = shallow(<App />)
    expect(component.instance().getRoundDuration(6)).toEqual(40)
  })
  it('returns 20 when given an input of 8', () => {
    const component = shallow(<App />)
    expect(component.instance().getRoundDuration(8)).toEqual(20)
  })
  it('returns 19 when given an input of 9', () => {
    const component = shallow(<App />)
    expect(component.instance().getRoundDuration(9)).toEqual(19)
  })
  it('returns 13 when given an input of 15', () => {
    const component = shallow(<App />)
    expect(component.instance().getRoundDuration(15)).toEqual(13)
  })
  it('returns 5 when given an input of 23', () => {
    const component = shallow(<App />)
    expect(component.instance().getRoundDuration(23)).toEqual(5)
  })
  it('returns 5 when given an input of 99', () => {
    const component = shallow(<App />)
    expect(component.instance().getRoundDuration(99)).toEqual(5)
  })
})
