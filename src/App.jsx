import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'
import NavigationRail from './Components/NavigationRail/NavigationRail'
import ChatPage from './Components/ChatPage/ChatPage'
import axios from 'axios'

function App() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    console.log("running theme effect", theme)
    document.documentElement.setAttribute('theme', theme)
  }, [theme])

  const [chatId, setChatId] = useState("")
  const [chats, setChats] = useState([])

  const getChats = useCallback(() => {
    axios.get('http://localhost:8081/ai/get-chats',
      {
        params: {
          emailId: "mrugendra@123.com"
        }
      }
    )
      .then(res => {
        setChats(res.data)
      })
  }, [])

  useEffect(() => {
    getChats()
  }, [getChats])

  const addChat = () => {
    axios.post('http://localhost:8081/ai/new-chat', {
      emailId: "mrugendra@123.com"
    })
      .then(res => {
        getChats()
        setChatId(res.data._id)
      })
      .catch(e => {
        console.error("Gettin error addign chat", e)
      })
  }
  return (
    <div className="MainPage">
      <NavigationRail chats={chats.map(chat => ({
        ButtonText: chat.chatName && chat.chatName !== "" ? chat.chatName : chat._id,
        onClick: () => {
          setChatId(chat._id)
        },
      }))}
        addChat={addChat}
      />
      <ChatPage chatId={chatId} getChats={getChats()} />
    </div>
  )
}

export default App
