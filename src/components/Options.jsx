import React from 'react'

import Button from '../components/Button'

function Options(props) {
  return (
    <div className='options-container'>
      <input
        id='import-from-csv'
        type='file'
        accept='.csv'
        className='import-from-csv'
        onChange={props.importFromCSV}
      />
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
      <Button
        type='button'
        value='Run Optimizer'
        className='btn-primary run-optimizer'
        onClick={props.runOptimizer}
      />
    </div>
  )
}

Options.propTypes = {
  noRepeatChoices: React.PropTypes.bool.isRequired,
  updateNoRepeatChoices: React.PropTypes.func.isRequired,
  runOptimizer: React.PropTypes.func.isRequired,
  importFromCSV: React.PropTypes.func.isRequired,
}
module.exports = Options
