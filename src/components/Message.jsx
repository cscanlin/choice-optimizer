import React from 'react'

function Message(props) {
  if (props.showMessage) {
    return (
      <div className='message-container'>
        <span>{props.message}</span>
      </div>
    )
  }
}

Message.propTypes = {
  message: React.PropTypes.string.isRequired,
  showMessage: React.PropTypes.bool.isRequired,
}
module.exports = Message
