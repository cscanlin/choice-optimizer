import React from 'react'
import Cell from './Cell'

function Row(props) {
  return (
    <tr className={`row ${props.rowID}`}>
      <Cell
        key={`${props.name}`}
        cellID={`${props.name}`}
        cellContents={props.name}
        cellType='name'
        handleCellChange={props.handleCellChange}
        isImmutable={['choices', 'maxPerChoice'].includes(props.name)}
      />
      {props.orderedChoices.map(choice =>
        <Cell
          key={`${props.name}&${choice}`}
          cellID={`${props.name}&${choice}`}
          cellContents={props.rowData[choice]}
          cellType={['choices', 'maxPerChoice'].includes(props.name) ? props.name : 'rank'}
          score={props.rowScores[choice]}
          slack={props.choiceSlack[choice]}
          handleCellChange={props.handleCellChange}
        />
      )}
      <td className='spacing-cell' />
      {props.name !== 'maxPerChoice' ?
        <Cell
          key={`${props.name}&choicesPerName`}
          cellID={`${props.name}&choicesPerName`}
          cellContents={props.name === 'choices' ? 'choicesPerName' : props.choicesPerName[props.name]}
          cellType='choicesPerName'
          handleCellChange={props.handleCellChange}
          isImmutable={props.name === 'choices'}
        />
      : null
      }
    </tr>
  )
}

Row.defaultProps = {
  rowData: {},
  rowScores: {},
  choicesPerName: {},
  choiceSlack: {},
}

Row.propTypes = {
  name: React.PropTypes.string.isRequired,
  rowID: React.PropTypes.string.isRequired,
  orderedChoices: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  rowData: React.PropTypes.objectOf(
    React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ])
  ).isRequired,
  rowScores: React.PropTypes.objectOf(React.PropTypes.number),
  choiceSlack: React.PropTypes.objectOf(React.PropTypes.number),
  choicesPerName: React.PropTypes.objectOf(React.PropTypes.number),
  handleCellChange: React.PropTypes.func.isRequired,
}

export default Row
