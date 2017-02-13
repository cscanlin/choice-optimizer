import React from 'react'

function Cell(props) {
  const inputType = props.cellType === 'rank' ? 'number' : 'text'
  if (props.isImmutable) {
    return (
      <span>{props.cellContents}</span>
    )
  }
  return (
    <input
      type={inputType}
      defaultValue={props.cellContents}
      onBlur={e => props.handleCellChange(e, props.cellType, props.cellID)}
    />
  )
}

Cell.defaultProps = {
  isImmutable: false,
}

Cell.propTypes = {
  cellID: React.PropTypes.string.isRequired,
  cellContents: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]).isRequired,
  cellType: React.PropTypes.string.isRequired,
  isImmutable: React.PropTypes.bool.isRequired,
  handleCellChange: React.PropTypes.func.isRequired,
}

export default Cell
