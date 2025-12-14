import React from 'react'
import Message from './Message'

const MessageList = ({messageList}) => {

    // const messageList = use(messageListPromise)
    // console.log("messageList", messageList)

  return (
    <div className='message-list'
    >
        <div className='message-area'>
            {messageList.map(message=>(
                <Message key={message._id} role={message.role} content={message.content} />
            ))}
        </div>
    </div>
  )
}

export default MessageList