import React from 'react'

function Message(props) {
  const bgColors = {
    error: 'lightpink',
    null: 'white',
  }
  const textColors = {
    error: 'darkred',
    null: 'black',
  }
  return (
    <div style={{ backgroundColor: bgColors[props.messageType] }} className='message-container'>
      {props.showMessage
        ? <span style={{ color: textColors[props.messageType] }}>{props.message}</span>
        : null
      }
    </div>
  )
}

Message.defaultProps = {
  messageType: null,
}

Message.propTypes = {
  message: React.PropTypes.string.isRequired,
  showMessage: React.PropTypes.bool.isRequired,
  messageType: React.PropTypes.string,
}
module.exports = Message
