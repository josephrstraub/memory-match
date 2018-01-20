import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from './'
import Alert, { Button } from '../Alert'

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
  const component = mount(<App />)
  component.find(Alert).find(Button).simulate('click')
  expect(component.instance().state.tiles.length).toEqual(12)
})

it('flips a tile when it is clicked', () => {})

it('does not flip a tile when it is clicked if the game is not active', () => {})

it('does not flip a tile when it is clicked if it is already matched to another tile', () => {})

it('does not flip a tile when it is clicked if it is the third tile clicked on the current turn', () => {})

it('sets tiles as matched if user clicks two of the same tile', () => {})

it('ends the game if user fails to complete in allotted time', () => {})

it('shows user stats after failed round', () => {})

it('allows for game to restart after failed round', () => {})

it('will add more tiles after a user completes a round in time', () => {})

it('will count down from 3 to indicate the new round is beginning', () => {})

it('will not allow the user to flip any tiles prior to the game starting', () => {})

it('will lower the clock for the next round if the most recent round was stage 2', () => {})
