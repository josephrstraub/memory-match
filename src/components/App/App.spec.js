import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from './'
import Alert, { Button } from '../Alert'
import Tile from '../Tile'

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
  component.instance().startGame({ preventDefault: jest.fn() })
  expect(component.instance().state.tiles.length).toEqual(12)
})

it('should give an id to every tile', () => {
  const component = shallow(<App />)
  component.instance().startGame({ preventDefault: jest.fn() })
  const tiles = component.instance().state.tiles
  expect(tiles.every(tile => tile.hasOwnProperty('id'))).toEqual(true)
})

it('should match tiles in pairs of two using an id', () => {
  const component = shallow(<App />)
  component.instance().startGame({ preventDefault: jest.fn() })
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

it('flips a tile when it is clicked', () => {
  const component = mount(<App />)
  component.instance().startGame({ preventDefault: jest.fn() })
  component.first(Tile).simulate('click')
  expect(component.instance().state.tiles[0].backFaceIsVisible).toEqual(true)
})

// it('does not flip a tile when it is clicked if the game is not active', () => {
//   const component = shallow(<App />)
//   component.instance().startGame({ preventDefault: jest.fn() })
//   component.instance().handleTileClick(0, 0)
// })

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
  component.instance().startGame({ preventDefault: jest.fn() })
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

it('ends the game if user fails to complete in allotted time', () => {})

it('shows user stats after failed round', () => {})

it('allows for game to restart after failed round', () => {})

it('will add more tiles after a user completes a round in time', () => {})

it('will count down from 3 to indicate the new round is beginning', () => {})

it('will not allow the user to flip any tiles prior to the game starting', () => {})

it('will lower the clock for the next round if the most recent round was stage 2', () => {})
