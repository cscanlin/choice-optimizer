import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from 'react-bootstrap'

import * as optimizerActions from '../actions/optimizerActions'

import Row from '../components/Row'
import Options from '../components/Options'
import Message from '../components/Message'

import { MAX_CELLS } from '../constants/optimizerConstants'

class OptimizerApp extends Component {
  constructor(props) {
    super(props)
    this.handleCellChange = this.handleCellChange.bind(this)
    this.prepareFetch = this.prepareFetch.bind(this)
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

  prepareFetch() {
    const numCells = this.props.orderedNames.length * this.props.orderedChoices.length
    if (numCells <= MAX_CELLS) {
      const formattedData = {
        choiceRanks: this.props.choiceRanks,
        maxPerChoice: this.props.maxPerChoice,
        choicesPerName: this.props.choicesPerName,
        noRepeatChoices: this.props.noRepeatChoices,
      }
      return this.props.actions.fetchScores(formattedData)
    } else {
      return this.props.actions.tooManyCellsError()
    }
  }

  render() {
    const exportFormatOptions = [
      { value: 'asGrid', label: 'As Grid (csv)' },
      { value: 'byName', label: 'By Name (json)' },
      { value: 'byChoice', label: 'By Choice (json)' },
      { value: 'exportInputData', label: 'Export Input Data (json)' },
    ]
    return (
      <div className='OptimizerApp'>
        <Message
          message={this.props.message}
          showMessage={this.props.showMessage}
          messageType={this.props.messageType}
        />
        <div className='big-inline-container'>
          <Options
            noRepeatChoices={this.props.noRepeatChoices}
            updateNoRepeatChoices={this.props.actions.updateNoRepeatChoices}
            runOptimizer={this.prepareFetch}
            importDataFile={this.props.actions.importDataFile}
            exportFormatOptions={exportFormatOptions}
            exportFormat={this.props.exportFormat}
            updateExportFormat={this.props.actions.updateExportFormat}
            exportData={() => this.props.actions.exportData(this.props)}
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
          <div className='add-choice-container'>
            <Button bsStyle='primary' onClick={this.props.actions.addChoice}>
              Add Choice
            </Button>
          </div>
        </div>
        <div className='add-name-container'>
          <Button bsStyle='primary' onClick={this.props.actions.addName}>
            Add Name
          </Button>
        </div>
      </div>
    )
  }
}

OptimizerApp.defaultProps = {
  scores: {},
  choiceSlack: {},
  messageType: null,
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
  message: React.PropTypes.string.isRequired,
  showMessage: React.PropTypes.bool.isRequired,
  messageType: React.PropTypes.string,
  actions: React.PropTypes.objectOf(React.PropTypes.func).isRequired,
}

function mapStateToProps(state) {
  return { ...state }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(optimizerActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OptimizerApp)
