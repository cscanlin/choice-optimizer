import React from 'react'

function LoadingIcon(props) {
  return <span>{props.isFetching.toString()}</span>
}

LoadingIcon.propTypes = {
  isFetching: React.PropTypes.bool.isRequired,
}
module.exports = LoadingIcon
