import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import OptimizerApp from './containers/OptimizerApp'
import configureStore from './store/configureStore'
import './css/OptimizerApp.css'
import './css/reactDropdown.css'
import './css/githubCorner.css'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <OptimizerApp />
  </Provider>,
  document.getElementById('root')
)
