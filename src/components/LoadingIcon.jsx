import React from 'react'
import loadingIcon from '../loading-icon.gif'

function LoadingIcon(props) {
  const imageStyle = { display: props.isFetching ? 'inline-block' : 'none' }
  return (
    <div className='loading-icon-container'>
      <img
        src={loadingIcon}
        className='loading-icon'
        style={imageStyle}
        alt='loading...'
      />
    </div>
  )
}

LoadingIcon.propTypes = {
  isFetching: React.PropTypes.bool.isRequired,
}
module.exports = LoadingIcon
