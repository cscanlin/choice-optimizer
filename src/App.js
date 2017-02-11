import React, { Component } from 'react';
import './App.css';

import Row from './components/Row.jsx';
import {renameKey} from './utils.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // orderedNames: [],
      orderedNames: ['x', 'y', 'z'],
      // orderedChoices: [],
      orderedChoices: ['a'],
      // name_choices: {},
      name_choices: {'x': {'a':1}, 'y': {'a':3}, 'z': {'a':2}},
    }
    this.handleCellChange = this.handleCellChange.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateChoice = this.updateChoice.bind(this)
    this.updateRank = this.updateRank.bind(this)
  }

  handleCellChange(e, cellType, cellID) {
    const typeUpdateFunc = {
      'name': this.updateName,
      'choice': this.updateChoice,
      'rank': this.updateRank,
    }
    typeUpdateFunc[cellType](cellID, e.target.value)
  }

  updateName(cellID, newValue) {
    var name_choices = this.state.name_choices
    var orderedNames = this.state.orderedNames
    name_choices = renameKey(name_choices, cellID, newValue)
    orderedNames[orderedNames.indexOf(cellID)] = newValue
    this.setState({ name_choices: name_choices, orderedNames: orderedNames})
  }

  updateChoice(cellID, newValue) {
    const choice = cellID.split('&')[1]
    var name_choices = this.state.name_choices
    var orderedChoices = this.state.orderedChoices
    Object.keys(name_choices).forEach(name =>
      name_choices[name] = renameKey(name_choices[name], choice, newValue)
    )
    orderedChoices[orderedChoices.indexOf(choice)] = newValue
    this.setState({ name_choices: name_choices, orderedChoices: orderedChoices})
  }

  updateRank(cellID, newValue) {
    var name_choices = this.state.name_choices
    const [name, choice] = cellID.split('&')
    name_choices[name][choice] = parseInt(newValue)
    this.setState({ name_choices: name_choices })
  }

  render() {
    return (
      <div className="App">
        <Row
          key={`choice-row`}
          name={'choices'}
          orderedChoices={this.state.orderedChoices}
          handleCellChange={this.handleCellChange}
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
      </div>
    );
  }
}

export default App;
