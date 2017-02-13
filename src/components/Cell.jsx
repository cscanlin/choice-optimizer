import React, { Component } from 'react'

class Cell extends Component {
  borderColor() {
    return this.props.score > 0 ? '#00FF00' : null
    // const scoreColors = {
    //   1: '#00FF00',
    // }
    // return scoreColors[this.props.score]
  }

  cellStyle() {
    return {
      borderColor: this.borderColor(),
    }
  }

  render() {
    const numericTypes = ['maxPerChoice', 'rank', 'choicesPerName']
    const inputType = numericTypes.includes(this.props.cellType) ? 'number' : 'text'
    if (this.props.isImmutable) {
      return (
        <div className={`cell immutable-cell ${this.props.cellType}-cell`}>
          <span className='cell-contents immutable-cell-contents'>{this.props.cellContents}</span>
        </div>
      )
    }
    return (
      <div className={`cell input-cell ${this.props.cellType}-cell`}>
        <input
          className='cell-contents input-cell-contents'
          style={this.cellStyle()}
          type={inputType}
          defaultValue={this.props.cellContents}
          onBlur={e => this.props.handleCellChange(e, this.props.cellType, this.props.cellID)}
        />
      </div>
    )
  }
}

Cell.defaultProps = {
  isImmutable: false,
  score: 0,
}

Cell.propTypes = {
  cellID: React.PropTypes.string.isRequired,
  cellContents: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]).isRequired,
  cellType: React.PropTypes.string.isRequired,
  isImmutable: React.PropTypes.bool.isRequired,
  score: React.PropTypes.number,
  handleCellChange: React.PropTypes.func.isRequired,
}

export default Cell
