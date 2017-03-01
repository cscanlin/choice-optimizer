import React from 'react'
import loadingIcon from '../loading-icon.gif'

function LoadingIcon(props) {
  const imageStyle = { display: props.isFetching ? 'inline-block' : 'none' }
  return (
    <img
      src={loadingIcon}
      className='loading-icon'
      style={imageStyle}
      alt='loading...'
    />
  )
}

LoadingIcon.propTypes = {
  isFetching: React.PropTypes.bool.isRequired,
}
module.exports = LoadingIcon
