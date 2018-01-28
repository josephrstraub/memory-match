import React from 'react'
import ReactDOM from 'react-dom'
import Clock from './'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Clock display={3} />, div)
  ReactDOM.unmountComponentAtNode(div)
})
