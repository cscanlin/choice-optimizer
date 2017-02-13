import React from 'react'
import Cell from './Cell'

function Row(props) {
  const cellType = props.rowData ? 'rank' : 'choice'
  return (
    <div className='row'>
      <Cell
        key={`${props.name}`}
        cellID={`${props.name}`}
        cellContents={props.name}
        cellType='name'
        handleCellChange={props.handleCellChange}
        isImmutable={props.name === 'choices'}
      />
      {props.orderedChoices.map(choice =>
        <Cell
          key={`${props.name}&${choice}`}
          cellID={`${props.name}&${choice}`}
          cellContents={props.rowData ? props.rowData[choice] : choice}
          cellType={cellType}
          handleCellChange={props.handleCellChange}
        />
      )}
    </div>
  )
}

Row.propTypes = {
  name: React.PropTypes.string.isRequired,
  orderedChoices: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  rowData: React.PropTypes.objectOf(React.PropTypes.number),
  handleCellChange: React.PropTypes.func.isRequired,
}

export default Row
