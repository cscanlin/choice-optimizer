import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as optimizerActions from '../actions/optimizerActions'

import Row from '../components/Row'
import Button from '../components/Button'
import Options from '../components/Options'

import defaultData from '../defaultData'

class OptimizerApp extends Component {
  constructor(props) {
    super(props)
    this.state = { ...defaultData }
    this.handleCellChange = this.handleCellChange.bind(this)
    this.runOptimizer = this.runOptimizer.bind(this)
  }

  handleCellChange(e, cellType, cellID) {
    const typeUpdateFunc = {
      name: this.props.actions.updateName,
      choices: this.props.actions.updateChoice,
      rank: this.props.actions.updateRank,
      maxPerChoice: this.props.actions.updateMaxPerChoice,
      choicesPerName: this.props.actions.updateChoicesPerName,
    }
    typeUpdateFunc[cellType](cellID, e.target.value)
  }

  runOptimizer() {
    const formattedData = {
      choiceRanks: this.props.choiceRanks,
      constraintBounds: Object.assign({}, this.props.maxPerChoice, this.props.choicesPerName),
      noRepeatChoices: this.props.noRepeatChoices,
    }
    console.log(formattedData)
    this.props.actions.fetchScores(formattedData)
  }

  render() {
    return (
      <div className='OptimizerApp'>
        <table className='data-grid'>
          <thead>
            <Row
              key='choice-row'
              rowID='choice-row'
              name='choices'
              orderedChoices={this.props.orderedChoices}
              rowData={this.props.orderedChoices.reduce((result, item) => {
                result[item] = item; return result
              }, {})}
              handleCellChange={this.handleCellChange}
            />
          </thead>
          <tbody>
            {this.props.orderedNames.map(name =>
              <Row
                key={`row-${name}`}
                rowID={`row-${name} data-row`}
                name={name}
                orderedChoices={this.props.orderedChoices}
                rowData={this.props.choiceRanks[name]}
                rowScores={this.props.scores[name]}
                choicesPerName={this.props.choicesPerName}
                handleCellChange={this.handleCellChange}
              />
            )}
          </tbody>
          <tfoot>
            <Row
              key='maxPerChoice-row'
              rowID='maxPerChoice-row'
              name='maxPerChoice'
              orderedChoices={this.props.orderedChoices}
              rowData={this.props.maxPerChoice}
              handleCellChange={this.handleCellChange}
            />
          </tfoot>
        </table>

        <Button
          type='button'
          value='Add Choice'
          className='btn-primary add-choice'
          onClick={this.props.actions.addChoice}
        />
        <Button
          type='button'
          value='Run Optimizer'
          className='btn-primary run-optimizer'
          onClick={this.runOptimizer}
        />
        <Button
          type='button'
          value='Add Name'
          className='btn-primary add-name'
          onClick={this.props.actions.addName}
        />
        <Options
          noRepeatChoices={this.props.noRepeatChoices}
          updateNoRepeatChoices={this.props.actions.updateNoRepeatChoices}
        />
      </div>
    )
  }
}

OptimizerApp.propTypes = {
  orderedNames: React.PropTypes.array.isRequired,
  orderedChoices: React.PropTypes.array.isRequired,
  choiceRanks: React.PropTypes.object.isRequired,
  scores: React.PropTypes.object.isRequired,
  maxPerChoice: React.PropTypes.object.isRequired,
  choicesPerName: React.PropTypes.object.isRequired,
  noRepeatChoices: React.PropTypes.bool.isRequired,
  actions: React.PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    orderedNames: state.orderedNames,
    orderedChoices: state.orderedChoices,
    choiceRanks: state.choiceRanks,
    scores: state.scores,
    maxPerChoice: state.maxPerChoice,
    choicesPerName: state.choicesPerName,
    noRepeatChoices: state.noRepeatChoices,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(optimizerActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OptimizerApp)