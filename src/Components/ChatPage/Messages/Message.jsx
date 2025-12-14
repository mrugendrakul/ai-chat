import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const Message = ({
    role,content
}) => {
  return (
    <div className={role === "user"?'user-message-block':'ai-message-block'}>
        <span className={role === "user"?'user-message-block-content':'ai-message-block-content'}>
        <ReactMarkdown
      
          remarkPlugins={[remarkGfm]}
        >
          {content}
          </ReactMarkdown>
        </span>
    </div>
  )
}

export default Message