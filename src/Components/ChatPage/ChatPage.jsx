import React, { Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import './ChatPage.css'
import MessageList from './Messages/MessageList'
import Send from '../../Icons/Send'
import axios from 'axios'
import LoadingMessage from './Messages/LoadingMessage'

const ChatPage = ({ chatId }) => {

    const [message, setMessage] = useState('')
    const messageTextAreaRef = useRef(null)
    const [textHeight, setMinHeight] = useState(40)
    const [isLoading, setIsLoading] = useState(true)
    const [currentChat, setCurrentChat] = useState(
        {
            "_id": "693ee18bc352289e5057320a",
            "chatName": "New Chat",
        })
    const [aiMessage, setAiMessage] = useState("")
    const [aiDone, setAiDone] = useState(true)
    const maxHeight = 200
    const minHeight = 25

    const counter = useRef(0)

    const [messageList, setMessageList] = useState([])

    const addMessage = (message) => {
        setMessageList(prev =>
            [message, ...prev]
        )
    }
    useEffect(() => {
        if (chatId !== "") {
            axios.get('http://localhost:8081/ai/get-messages',
                {
                    params: {
                        chatId: chatId
                    }
                }
            )
                .then((response) => {
                    setMessageList(response.data?.reverse())
                    setIsLoading(false)
                })
                .catch((err) => {
                    setMessageList([])
                    setIsLoading(false)
                })
        }
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

    const getCurrentChat = () => {
        axios.get('http://localhost:8081/ai/get-chat', {
            params: {
                chatId: chatId
            }
        })
            .then((res) => {
                setCurrentChat(res.data)
            })
            .catch(e => {
                console.error("Getting error ", e)
            })
    }

    const submitMessage = async (e) => {
        e.preventDefault()
        const content = message
        setMessage("")
        const messageLenght = messageList.length
        if (messageLenght === 0) {
            getCurrentChat
        }
        counter.current = counter.current + 1
        addMessage({
            _id: counter.current,
            role: "user",
            content: content
        })
        counter.current = counter.current + 1
        addMessage({
            _id: counter.current,
            role: "assistant",
            content: ""
        })
        console.log("Form sumited")
        setIsLoading(true)
        const response = await fetch('http://localhost:8081/ai/send-message',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        chatId: chatId,
                        role: "user",
                        content: content,
                    }
                )
            }
        )

        if (!response.body) {
            throw new Error("stream not allowed in browser")
        }

        const reader = response.body.getReader()
        const decoder = new TextDecoder();
        let aiTextAccumulator = "";
        while (true) {
            const { done, value } = await reader.read()
            setAiDone(false)
            if (done) {
                // setAiDone(true)
                // addMessage({
                //     _id:aiTextAccumulator,
                //     role:"assistant",
                //     content:aiTextAccumulator
                // })
                setIsLoading(false)
                break
            };

            const chuckText = decoder.decode(value, { stream: true })
            aiTextAccumulator += chuckText
            setMessageList(prev => {
                const newList = [...prev]
                // const lastIndex = newList.length -1;
                newList[0] = {
                    ...newList[0],
                    content: aiTextAccumulator
                }
                return newList
            }
            )

            // setAiMessage(aiTextAccumulator)
        }
    }

    return (
        <div style={{
            height: '100svh',
            width: '100%', display: 'flex', justifyContent: "center",
            flexDirection: 'column', alignItems: 'center'
        }}>
            <h2>{chatId !== "" && currentChat.chatName}</h2>
            <MessageList messageList={messageList} />
            {/* {isLoading && (chatId !== "") && <LoadingMessage />} */}
            {chatId !== "" && messageList.length === 0 ? <p>No messages here</p> : chatId === "" && <p>Select chat with id to start chatting.</p>}
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