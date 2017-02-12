import React from 'react';

function Button(props) {
  return <input {...props} />
}

Button.propTypes = {
  type: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  className: React.PropTypes.string,
  onClick: React.PropTypes.func.isRequired,
}
module.exports = Button
