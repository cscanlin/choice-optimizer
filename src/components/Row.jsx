import React, { Component } from 'react';
import Cell from './Cell.jsx';

class Row extends Component {
  render() {
    return (
      <div className='row'>
        <Cell
          key={`name-${this.props.name}`}
          cellContents={this.props.name}
          cellType='name'
          handleCellChange={this.props.handleCellChange}
          />
        {this.props.orderedChoices.map(choice =>
          <Cell
            key={`rank-${this.props.name}&${this.props.choice}`}
            cellContents={this.props.rowData ? this.props.rowData[choice]: choice}
            cellType='rank'
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
