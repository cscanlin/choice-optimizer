import React, { Component } from 'react';
import Cell from './Cell.jsx';

class Row extends Component {
  render() {
    const cellType = this.props.rowData ? 'rank' : 'choice'
    return (
      <div className='row'>
        <Cell
          key={`${this.props.name}`}
          cellID={`${this.props.name}`}
          cellContents={this.props.name}
          cellType='name'
          handleCellChange={this.props.handleCellChange}
          isImmutable={this.props.name === 'choices'}
        />
        {this.props.orderedChoices.map(choice =>
          <Cell
            key={`${this.props.name}&${choice}`}
            cellID={`${this.props.name}&${choice}`}
            cellContents={this.props.rowData ? this.props.rowData[choice]: choice}
            cellType={cellType}
            handleCellChange={this.props.handleCellChange}
          />
        )}
      </div>
    );
  }
}

Row.propTypes = {
  name: React.PropTypes.string.isRequired,
  orderedChoices: React.PropTypes.array.isRequired,
  rowData: React.PropTypes.object,
  handleCellChange: React.PropTypes.func.isRequired
}

export default Row;
