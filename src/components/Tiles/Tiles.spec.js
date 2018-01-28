import React from 'react'
import ReactDOM from 'react-dom'
import Tiles from './'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Tiles tiles={[]} />, div)
  ReactDOM.unmountComponentAtNode(div)
})
