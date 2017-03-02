import React, { Component } from 'react'

class Cell extends Component {
  cellColor() {
    if (this.props.score > 0) {
      return '#00FF00'
    } else if (this.props.cellType === 'maxPerChoice' && this.props.slack === 0) {
      return '#FF0000'
    } else {
      return null
    }
  }

  cellStyle() {
    return {
      borderColor: this.cellColor(),
      borderStyle: this.cellColor() === null ? 'solid' : 'double',
      borderWidth: this.props.score + 1,
    }
  }

  immutableCellContents() {
    if (this.props.cellType === 'name' && this.props.cellContents === 'choices') {
      return 'Names ↓ / Choices →'
    } else {
      return this.props.cellContents
    }
  }

  immutableCell() {
    return (
      <td className={`cell immutable-cell ${this.props.cellType}-cell`}>
        <span className='cell-contents immutable-cell-contents'>
          {this.immutableCellContents()}
        </span>
      </td>
    )
  }

  displaySlack() {
    if (this.props.cellType === 'maxPerChoice' && this.props.slack !== null) {
      return (
        <div style={{ color: this.cellColor() }} className='slack-container'>
          ({this.props.slack} left)
        </div>
      )
    } else {
      return null
    }
  }

  render() {
    const numericTypes = ['maxPerChoice', 'rank', 'choicesPerName']
    const inputType = numericTypes.includes(this.props.cellType) ? 'number' : 'text'
    if (this.props.isImmutable) {
      return this.immutableCell()
    }
    return (
      <td style={this.cellStyle()} className={`cell input-cell ${this.props.cellType}-cell`}>
        <div className='cell-contents-container'>
          <input
            className='cell-contents input-cell-contents'
            type={inputType}
            defaultValue={this.props.cellContents}
            onBlur={e => this.props.handleCellChange(e, this.props.cellType, this.props.cellID)}
          />
          {this.displaySlack()}
        </div>
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
