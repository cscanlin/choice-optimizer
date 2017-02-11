import React, { Component } from 'react';

class Cell extends Component {
  render() {
    return (
      <input
        type="text"
        defaultValue={this.props.cellContents}
        onBlur={(e) => this.props.handleCellChange(e, this.props.cellType, this.props.cellID)}
      />
    )
  }
}

Cell.defaultProps = {
  isImmutable: false,
};

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

export default Cell;
