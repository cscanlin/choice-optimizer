import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as optimizerActions from '../actions/optimizerActions'

import Row from '../components/Row'
import Button from '../components/Button'
import Options from '../components/Options'

import { exportScores } from '../utils'

class OptimizerApp extends Component {
  constructor(props) {
    super(props)
    this.handleCellChange = this.handleCellChange.bind(this)
    this.formatDataForAPI = this.formatDataForAPI.bind(this)
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

  formatDataForAPI() {
    return {
      choiceRanks: this.props.choiceRanks,
      constraintBounds: Object.assign({}, this.props.maxPerChoice, this.props.choicesPerName),
      noRepeatChoices: this.props.noRepeatChoices,
    }
  }

  render() {
    const exportFormatOptions = [
      { value: 'asGrid', label: 'As Grid (csv)' },
      { value: 'byName', label: 'By Name (json)' },
      { value: 'byChoice', label: 'By Choice (json)' },
    ]
    return (
      <div className='OptimizerApp'>
        <div className='big-inline-container'>
          <Options
            noRepeatChoices={this.props.noRepeatChoices}
            updateNoRepeatChoices={this.props.actions.updateNoRepeatChoices}
            runOptimizer={() => this.props.actions.fetchScores(this.formatDataForAPI())}
            importFromCSV={this.props.actions.importFromCSV}
            exportFormatOptions={exportFormatOptions}
            exportFormat={this.props.exportFormat}
            updateExportFormat={this.props.actions.updateExportFormat}
            exportScores={() => exportScores(this.props.exportFormat.value, this.props)}
            isFetching={this.props.isFetching}
          />
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
                choiceSlack={this.props.choiceSlack}
              />
            </tfoot>
          </table>
          <Button
            type='button'
            value='Add Choice'
            className='btn-primary add-choice'
            onClick={this.props.actions.addChoice}
          />
        </div>
        <Button
          type='button'
          value='Add Name'
          className='btn-primary add-name'
          onClick={this.props.actions.addName}
        />
      </div>
    )
  }
}

OptimizerApp.defaultProps = {
  scores: {},
  choiceSlack: {},
}

OptimizerApp.propTypes = {
  orderedNames: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  orderedChoices: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  choiceRanks: React.PropTypes.objectOf(
      React.PropTypes.objectOf(React.PropTypes.number)
  ).isRequired,
  scores: React.PropTypes.objectOf(
      React.PropTypes.objectOf(React.PropTypes.number)
  ).isRequired,
  choiceSlack: React.PropTypes.objectOf(React.PropTypes.number),
  maxPerChoice: React.PropTypes.objectOf(React.PropTypes.number).isRequired,
  choicesPerName: React.PropTypes.objectOf(React.PropTypes.number).isRequired,
  noRepeatChoices: React.PropTypes.bool.isRequired,
  exportFormat: React.PropTypes.shape({
    value: React.PropTypes.string,
    label: React.PropTypes.string,
  }).isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  actions: React.PropTypes.objectOf(React.PropTypes.func).isRequired,
}

function mapStateToProps(state) {
  return {
    orderedNames: state.orderedNames,
    orderedChoices: state.orderedChoices,
    choiceRanks: state.choiceRanks,
    scores: state.scores,
    choiceSlack: state.choiceSlack,
    maxPerChoice: state.maxPerChoice,
    choicesPerName: state.choicesPerName,
    noRepeatChoices: state.noRepeatChoices,
    exportFormat: state.exportFormat,
    isFetching: state.isFetching,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(optimizerActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OptimizerApp)
