import React from 'react'

function Options(props) {
  return (
    <div className='options-container'>
      <div className='choose-each-once-container'>
        <label htmlFor='choose-each-once-checkbox'>No Repeat Picks:</label>
        <input
          id='choose-each-once-checkbox'
          type='checkbox'
          checked={props.noRepeatChoices}
          className='checkbox choose-each-once-checkbox'
          onChange={props.updateNoRepeatChoices}
        />
      </div>
    </div>
  )
}

Options.propTypes = {
  noRepeatChoices: React.PropTypes.bool.isRequired,
  updateNoRepeatChoices: React.PropTypes.func.isRequired,
}
module.exports = Options
