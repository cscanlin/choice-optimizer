import React from 'react'
import ReactDOM from 'react-dom'
import OptimizerApp from './containers/OptimizerApp'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<OptimizerApp />, div)
})
