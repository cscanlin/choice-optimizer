import React, { Component } from 'react'

import defaultData from '../defaultData'

import Row from './Row'
import Button from './Button'
import Options from './Options'
import { renameKey } from '../utils'

class Optimizer extends Component {
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
    this.updateChoicesPerName = this.updateChoicesPerName.bind(this)
    this.updateNoRepeatChoices = this.updateNoRepeatChoices.bind(this)
  }

  getScores() {
    const formattedData = {
      choiceRanks: this.state.choiceRanks,
      constraintBounds: Object.assign({}, this.state.maxPerChoice, this.state.choicesPerName),
      noRepeatChoices: this.state.noRepeatChoices,
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
    const choicesPerName = this.state.choicesPerName
    const newName = `name_${this.state.orderedNames.length + 1}`
    choiceRanks[newName] = this.state.orderedChoices.reduce((result, item) => {
      result[item] = 0
      return result
    }, {})
    choicesPerName[newName] = 1
    this.setState({
      orderedNames: this.state.orderedNames.concat([newName]),
      choiceRanks,
      choicesPerName,
    })
  }

  addChoice() {
    const choiceRanks = this.state.choiceRanks
    const maxPerChoice = this.state.maxPerChoice
    const newChoice = `choice_${String.fromCharCode(this.state.orderedChoices.length + 97)}`
    Object.keys(choiceRanks).forEach(name =>
      choiceRanks[name][newChoice] = 0
    )
    maxPerChoice[newChoice] = 1
    this.setState({
      orderedChoices: this.state.orderedChoices.concat([newChoice]),
      choiceRanks,
      maxPerChoice,
    })
  }

  handleCellChange(e, cellType, cellID) {
    const typeUpdateFunc = {
      name: this.updateName,
      choices: this.updateChoice,
      rank: this.updateRank,
      maxPerChoice: this.updateMaxPerChoice,
      choicesPerName: this.updateChoicesPerName,
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
    this.setState({ choiceRanks, orderedChoices, maxPerChoice })
  }

  updateRank(cellID, newValue) {
    const choiceRanks = this.state.choiceRanks
    const [name, choice] = cellID.split('&')
    choiceRanks[name][choice] = parseInt(newValue)
    this.setState({ choiceRanks })
  }

  updateMaxPerChoice(cellID, newValue) {
    const choice = cellID.split('&')[1]
    const maxPerChoice = this.state.maxPerChoice
    maxPerChoice[choice] = parseInt(newValue)
    this.setState({ maxPerChoice })
  }

  updateChoicesPerName(cellID, newValue) {
    const name = cellID.split('&')[0]
    const choicesPerName = this.state.choicesPerName
    choicesPerName[name] = parseInt(newValue)
    this.setState({ choicesPerName })
  }

  updateNoRepeatChoices(e) {
    this.setState({ noRepeatChoices: e.target.checked })
  }

  render() {
    return (
      <div className='Optimizer'>
        <table className='data-grid'>
          <thead>
            <Row
              key='choice-row'
              rowID='choice-row'
              name='choices'
              orderedChoices={this.state.orderedChoices}
              rowData={this.state.orderedChoices.reduce((result, item) => {
                result[item] = item; return result
              }, {})}
              handleCellChange={this.handleCellChange}
            />
          </thead>
          <tbody>
            {this.state.orderedNames.map(name =>
              <Row
                key={`row-${name}`}
                rowID={`row-${name} data-row`}
                name={name}
                orderedChoices={this.state.orderedChoices}
                rowData={this.state.choiceRanks[name]}
                rowScores={this.state.scores[name]}
                choicesPerName={this.state.choicesPerName}
                handleCellChange={this.handleCellChange}
              />
            )}
          </tbody>
          <tfoot>
            <Row
              key='maxPerChoice-row'
              rowID='maxPerChoice-row'
              name='maxPerChoice'
              orderedChoices={this.state.orderedChoices}
              rowData={this.state.maxPerChoice}
              handleCellChange={this.handleCellChange}
            />
          </tfoot>
        </table>

        <Button
          type='button'
          value='Add Choice'
          className='btn-primary add-choice'
          onClick={this.addChoice}
        />
        <Button
          type='button'
          value='Run Optimizer'
          className='btn-primary run-optimizer'
          onClick={this.getScores}
        />
        <Button
          type='button'
          value='Add Name'
          className='btn-primary add-name'
          onClick={this.addName}
        />
        <Options
          noRepeatChoices={this.state.noRepeatChoices}
          updateNoRepeatChoices={this.updateNoRepeatChoices}
        />
      </div>
    )
  }
}

export default Optimizer
