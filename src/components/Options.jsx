import React from 'react'
import Dropdown from 'react-dropdown'

import Button from '../components/Button'

function Options(props) {
  return (
    <div className='options-container'>
      <div className='import-from-csv-container'>
        <input
          id='import-from-csv'
          type='file'
          accept='.csv'
          className='import-from-csv'
          onChange={props.importFromCSV}
        />
      </div>
      <div className='choose-each-once-container'>
        <label htmlFor='choose-each-once-checkbox'>No Repeat Picks:</label>
        <input
          id='choose-each-once-checkbox'
          type='checkbox'
          checked={props.noRepeatChoices}
          className='checkbox choose-each-once-checkbox'
          onChange={e => props.updateNoRepeatChoices(e.target.checked)}
        />
      </div>
      <div className='run-optimizer-container'>
        <Button
          type='button'
          value='Run Optimizer'
          className='btn-primary run-optimizer'
          onClick={props.runOptimizer}
        />
      </div>
      <div className='exporter-container'>
        <span className='export-options-label'>Export Format:</span>
        <div className='export-options-dropdown-container'>
          <Dropdown
            options={props.exportFormatOptions}
            onChange={props.updateExportFormat}
            value={props.exportFormat.label}
          />
        </div>
        <Button
          type='button'
          value='Export Results'
          className='btn-primary export-scores'
          onClick={props.exportScores}
        />
      </div>
    </div>
  )
}

Options.propTypes = {
  noRepeatChoices: React.PropTypes.bool.isRequired,
  updateNoRepeatChoices: React.PropTypes.func.isRequired,
  runOptimizer: React.PropTypes.func.isRequired,
  importFromCSV: React.PropTypes.func.isRequired,
  exportFormatOptions: React.PropTypes.arrayOf(
    React.PropTypes.objectOf(React.PropTypes.string)
  ).isRequired,
  exportFormat: React.PropTypes.shape({
    value: React.PropTypes.string,
    label: React.PropTypes.string,
  }).isRequired,
  updateExportFormat: React.PropTypes.func.isRequired,
  exportScores: React.PropTypes.func.isRequired,
}
module.exports = Options
