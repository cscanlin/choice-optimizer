import React, { Component } from 'react'
import './App.css'

import Row from './components/Row'
import Button from './components/Button'
import defaultData from './defaultData'
import { renameKey } from './utils'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { ...defaultData }
    this.handleCellChange = this.handleCellChange.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateChoice = this.updateChoice.bind(this)
    this.updateRank = this.updateRank.bind(this)
    this.addName = this.addName.bind(this)
    this.addChoice = this.addChoice.bind(this)
  }

  addName() {
    const nameChoices = this.state.name_choices
    const newName = `name-${this.state.orderedNames.length + 1}`
    nameChoices[newName] = this.state.orderedChoices.reduce((result, item) => {
      result[item] = 0
      return result
    }, {})
    this.setState({
      orderedNames: this.state.orderedNames.concat([newName]),
      name_choices: nameChoices,
    })
  }

  addChoice() {
    const nameChoices = this.state.name_choices
    const newChoice = `choice-${this.state.orderedChoices.length + 1}`
    Object.keys(nameChoices).forEach(name =>
      nameChoices[name][newChoice] = 0
    )
    this.setState({
      orderedChoices: this.state.orderedChoices.concat([newChoice]),
      name_choices: nameChoices,
    })
  }

  handleCellChange(e, cellType, cellID) {
    const typeUpdateFunc = {
      name: this.updateName,
      choice: this.updateChoice,
      rank: this.updateRank,
    }
    typeUpdateFunc[cellType](cellID, e.target.value)
  }

  updateName(cellID, newValue) {
    let nameChoices = this.state.name_choices
    const orderedNames = this.state.orderedNames
    nameChoices = renameKey(nameChoices, cellID, newValue)
    orderedNames[orderedNames.indexOf(cellID)] = newValue
    this.setState({ name_choices: nameChoices, orderedNames })
  }

  updateChoice(cellID, newValue) {
    const choice = cellID.split('&')[1]
    const nameChoices = this.state.name_choices
    const orderedChoices = this.state.orderedChoices
    Object.keys(nameChoices).forEach(name =>
      nameChoices[name] = renameKey(nameChoices[name], choice, newValue)
    )
    orderedChoices[orderedChoices.indexOf(choice)] = newValue
    this.setState({ name_choices: nameChoices, orderedChoices })
  }

  updateRank(cellID, newValue) {
    const nameChoices = this.state.name_choices
    const [name, choice] = cellID.split('&')
    nameChoices[name][choice] = parseInt(newValue)
    this.setState({ name_choices: nameChoices })
  }

  render() {
    return (
      <div className='App'>
        <Row
          key='choice-row'
          name='choices'
          orderedChoices={this.state.orderedChoices}
          handleCellChange={this.handleCellChange}
        />
        <Button
          type='button'
          value='Add Choice'
          className='btn-primary add-choice'
          onClick={this.addChoice}
        />
        {this.state.orderedNames.map(name =>
          <Row
            key={`row-${name}`}
            name={name}
            orderedChoices={this.state.orderedChoices}
            rowData={this.state.name_choices[name]}
            handleCellChange={this.handleCellChange}
          />
        )}
        <Button
          type='button'
          value='Add Name'
          className='btn-primary add-name'
          onClick={this.addName}
        />
      </div>
    )
  }
}

export default App
