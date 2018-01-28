import React from 'react'
import ReactDOM from 'react-dom'
import Checkmark from './'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Checkmark />, div)
  ReactDOM.unmountComponentAtNode(div)
})
