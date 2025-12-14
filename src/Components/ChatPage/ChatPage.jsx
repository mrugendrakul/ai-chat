import React, { Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import './ChatPage.css'
import MessageList from './Messages/MessageList'
import Send from '../../Icons/Send'
import axios from 'axios'
import LoadingMessage from './Messages/LoadingMessage'

const ChatPage = () => {

    const [message, setMessage] = useState('')
    const messageTextAreaRef = useRef(null)
    const [textHeight, setMinHeight] = useState(40)
    const [isLoading, setIsLoading] = useState(true)
    const maxHeight = 200
    const minHeight = 25

    const [chatId, setChatId] = useState("693ee18bc352289e5057320a")
    const counter = useRef(0)

    const [messageList, setMessageList] = useState([])

    const addMessage = (message) => {
        setMessageList(prev =>
            [...prev, message]
        )
    }
    useEffect(() => {
        axios.get('http://localhost:8081/ai/get-messages',
            {
                params: {
                    chatId: chatId
                }
            }
        )
            .then((response) => {
                setMessageList(response.data)
                setIsLoading(false)
            })
    }, [chatId])
    useLayoutEffect(() => {
        const textArea = messageTextAreaRef.current;
        // console.log("Message height change --->")
        if (textArea) {
            textArea.style.height = 'auto';
            const newHeight = Math.min(Math.max(minHeight, textArea.scrollHeight), maxHeight)
            textArea.style.height = `${newHeight}px`
            setMinHeight(newHeight)
        }
    }, [message])

    const submitMessage = (e) => {
        e.preventDefault()
        const content = message
        setMessage("")
        addMessage({
            _id:counter.current,
            role:"user",
            content:content
        })
        counter.current = counter.current +1
        console.log("Form sumited")
        setIsLoading(true)
        axios.post('http://localhost:8081/ai/send-message', {
            chatId:chatId,
            role:"user",
            content:content,
        })
        .then((expensiveResponse)=>{
            setIsLoading(false)
            const message = expensiveResponse.data
            addMessage(message)
        })
        .catch((e)=>{
            console.error("error in api calling ",e)
        })
    }

    return (
        <div style={{
            height: '100svh',
            width: '100%', display: 'flex', justifyContent: "center",
            flexDirection: 'column', alignItems: 'center'
        }}>
            <MessageList messageList={messageList} />
            {isLoading && <LoadingMessage />}
            {/* <div className=''> */}
            <form onSubmit={submitMessage} className='ai-text-field'
                style={{ height: `${textHeight}px` }}
            >
                <textarea
                    value={message}
                    ref={messageTextAreaRef}
                    onChange={(e) => { setMessage(e.target.value) }}
                    id='ai-message'
                    name='ai-message'
                    className='ai-text-area'
                    placeholder='Give me somthing to start with...'
                    style={{ resize: 'none' }}
                    maxLength={120}
                    rows={1}
                // onKeyDown={(e)=>{
                //     if(e.key === "Enter"){
                //         e.preventDefault()
                //         console.log("Enterpressed")
                //     }
                // }}
                />
                <div className='ai-message-send-wrapper'>
                    <button
                        className='ai-message-send'
                        type='submit'
                        disabled={message === "" || isLoading}
                    >
                        <Send style={{ width: '24px', height: '24px' }} fill={message === "" || isLoading
                            ? '#a8a8a8ff' : '#000'
                        }
                        ></Send>
                    </button>
                </div>
            </form>
            {/* </div> */}
        </div>
    )
}

export default ChatPage