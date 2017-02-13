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
    this.getScores = this.getScores.bind(this)
    this.updateMaxPerChoice = this.updateMaxPerChoice.bind(this)
  }

  getScores() {
    const formattedData = {
      choiceRanks: this.state.choiceRanks,
      constraint_bounds: this.state.maxPerChoice,
    }
    fetch('/optimize_choices', {
      method: 'POST',
      body: JSON.stringify(formattedData),
    }).then(result =>
      result.json()
    ).then((scores) => {
      this.setState({ scores })
    })
  }

  addName() {
    const choiceRanks = this.state.choiceRanks
    const newName = `name_${this.state.orderedNames.length + 1}`
    choiceRanks[newName] = this.state.orderedChoices.reduce((result, item) => {
      result[item] = 0
      return result
    }, {})
    this.setState({
      orderedNames: this.state.orderedNames.concat([newName]),
      choiceRanks,
    })
  }

  addChoice() {
    const choiceRanks = this.state.choiceRanks
    const newChoice = `choice_${String.fromCharCode(this.state.orderedChoices.length + 97)}`
    Object.keys(choiceRanks).forEach(name =>
      choiceRanks[name][newChoice] = 0
    )
    this.setState({
      orderedChoices: this.state.orderedChoices.concat([newChoice]),
      choiceRanks,
    })
  }

  handleCellChange(e, cellType, cellID) {
    const typeUpdateFunc = {
      name: this.updateName,
      choices: this.updateChoice,
      rank: this.updateRank,
      maxPerChoice: this.updateMaxPerChoice,
    }
    typeUpdateFunc[cellType](cellID, e.target.value)
  }

  updateName(cellID, newValue) {
    let choiceRanks = this.state.choiceRanks
    const orderedNames = this.state.orderedNames
    choiceRanks = renameKey(choiceRanks, cellID, newValue)
    orderedNames[orderedNames.indexOf(cellID)] = newValue
    this.setState({ choiceRanks, orderedNames })
  }

  updateChoice(cellID, newValue) {
    const choice = cellID.split('&')[1]
    const choiceRanks = this.state.choiceRanks
    const orderedChoices = this.state.orderedChoices
    let maxPerChoice = this.state.maxPerChoice
    Object.keys(choiceRanks).forEach(name =>
      choiceRanks[name] = renameKey(choiceRanks[name], choice, newValue)
    )
    maxPerChoice = renameKey(maxPerChoice, choice, newValue)
    orderedChoices[orderedChoices.indexOf(choice)] = newValue
    this.setState({ choiceRanks, orderedChoices, maxPerChoice})
  }

  updateMaxPerChoice(cellID, newValue) {
    const choice = cellID.split('&')[1]
    const maxPerChoice = this.state.maxPerChoice
    maxPerChoice[choice] = parseInt(newValue)
    this.setState({ maxPerChoice })
  }

  updateRank(cellID, newValue) {
    const choiceRanks = this.state.choiceRanks
    const [name, choice] = cellID.split('&')
    choiceRanks[name][choice] = parseInt(newValue)
    this.setState({ choiceRanks })
  }

  render() {
    return (
      <div className='App'>
        <Row
          key='choice-row'
          name='choices'
          orderedChoices={this.state.orderedChoices}
          rowData={this.state.orderedChoices.reduce((result, item) => {
            result[item] = item; return result
          }, {})}
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
            rowData={this.state.choiceRanks[name]}
            rowScores={this.state.scores[name]}
            handleCellChange={this.handleCellChange}
          />
        )}
        <Row
          key='maxPerChoice-row'
          name='maxPerChoice'
          orderedChoices={this.state.orderedChoices}
          rowData={this.state.maxPerChoice}
          handleCellChange={this.handleCellChange}
        />
        <Button
          type='button'
          value='Add Name'
          className='btn-primary add-name'
          onClick={this.addName}
        />
        <Button
          type='button'
          value='Run Optimizer'
          className='btn-primary run-optimizer'
          onClick={this.getScores}
        />
      </div>
    )
  }
}

export default App
