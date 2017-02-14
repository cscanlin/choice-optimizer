import React, { Component } from 'react'

class Cell extends Component {
  borderColor() {
    if (this.props.score > 0) {
      return '#00FF00'
    } else if (this.props.cellType === 'maxPerChoice' && this.props.slack === 0) {
      return '#FF0000'
    } else {
      return null
    }
    // const scoreColors = {
    //   1: '#00FF00',
    // }
    // return scoreColors[this.props.score]
  }

  cellStyle() {
    return {
      borderColor: this.borderColor(),
      // borderWidth: this.props.score + 1,
    }
  }

  immutableCell() {
    return (
      <td className={`cell immutable-cell ${this.props.cellType}-cell`}>
        <span className='cell-contents immutable-cell-contents'>{this.props.cellContents}</span>
      </td>
    )
  }

  render() {
    const numericTypes = ['maxPerChoice', 'rank', 'choicesPerName']
    const inputType = numericTypes.includes(this.props.cellType) ? 'number' : 'text'
    if (this.props.isImmutable) {
      return this.immutableCell()
    }
    return (
      <td className={`cell input-cell ${this.props.cellType}-cell`}>
        <input
          className='cell-contents input-cell-contents'
          style={this.cellStyle()}
          type={inputType}
          defaultValue={this.props.cellContents}
          onChange={e => this.props.handleCellChange(e, this.props.cellType, this.props.cellID)}
        />
      </td>
    )
  }
}

Cell.defaultProps = {
  isImmutable: false,
  score: 0,
  slack: null,
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
  slack: React.PropTypes.number,
  handleCellChange: React.PropTypes.func.isRequired,
}

export default Cell
