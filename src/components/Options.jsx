import React from 'react'
import Dropdown from 'react-dropdown'
import { Button } from 'react-bootstrap'

import LoadingIcon from '../components/LoadingIcon'

function Options(props) {
  return (
    <div className='options-container'>

      <div className='importer-container'>
        <label htmlFor='importer-input' className='btn btn-warning btn-file'>
          <span>Import Data</span>
          <input
            id='importer-input'
            type='file'
            accept='text/csv,application/json'
            onChange={props.importDataFile}
            style={{ display: 'none' }}
          />
        </label>
      </div>

      <div className='choose-each-once-container'>
        <label className='choose-each-once-checkbox-label' htmlFor='choose-each-once-checkbox'>
          No Repeat Picks:
        </label>
        <input
          id='choose-each-once-checkbox'
          type='checkbox'
          checked={props.noRepeatChoices}
          className='checkbox choose-each-once-checkbox'
          onChange={e => props.updateNoRepeatChoices(e.target.checked)}
        />
      </div>

      <div className='run-optimizer-container'>
        <Button bsStyle='success' onClick={props.runOptimizer} disabled={props.isFetching}>
          Run Optimizer
        </Button>
      </div>

      <LoadingIcon isFetching={props.isFetching} />

      <div className='exporter-container'>
        <span className='export-options-label'>Export Format:</span>
        <div className='export-options-dropdown-container'>
          <Dropdown
            options={props.exportFormatOptions}
            onChange={props.updateExportFormat}
            value={props.exportFormat.label}
          />
        </div>
        <div className='export-scores-container'>
          <Button bsStyle='primary' onClick={props.exportData}>
            Export Results
          </Button>
        </div>
      </div>

    </div>
  )
}

Options.propTypes = {
  noRepeatChoices: React.PropTypes.bool.isRequired,
  updateNoRepeatChoices: React.PropTypes.func.isRequired,
  runOptimizer: React.PropTypes.func.isRequired,
  importDataFile: React.PropTypes.func.isRequired,
  exportFormatOptions: React.PropTypes.arrayOf(
    React.PropTypes.objectOf(React.PropTypes.string)
  ).isRequired,
  exportFormat: React.PropTypes.shape({
    value: React.PropTypes.string,
    label: React.PropTypes.string,
  }).isRequired,
  updateExportFormat: React.PropTypes.func.isRequired,
  exportData: React.PropTypes.func.isRequired,
  isFetching: React.PropTypes.bool.isRequired,
}
module.exports = Options
