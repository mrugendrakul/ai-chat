import React from 'react'
import Message from './Message'

const LoadingMessage = () => {
  return (
    <div className='message-list-loading'
    >
        <div className='message-area-loading'>
                <Message role="Other" content="Loading message from ai..." />

        </div>
    </div>
  )
}

export default LoadingMessage