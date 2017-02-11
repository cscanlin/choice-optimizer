import React, { Component } from 'react';

class Cell extends Component {
  render() {
    return (
      <input
        type="text"
        value={this.props.cellContents}
        onChange={this.handleCellChange}
      />
    );
  }
}

Cell.defaultProps = {
  isImmutable: false,
};

Cell.propTypes = {
  cellContents: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]).isRequired,
  cellType: React.PropTypes.string.isRequired,
  isImmutable: React.PropTypes.bool.isRequired,
  handleCellChange: React.PropTypes.func.isRequired,
}

export default Cell;
