import React from 'react'

const Message = ({
    role,content
}) => {
  return (
    <div className={role === "user"?'user-message-block':'ai-message-block'}>
        <span className={role === "user"?'user-message-block-content':'ai-message-block-content'}>
        {content}
        </span>
    </div>
  )
}

export default Message