import { useEffect, useState } from 'react'
import './App.css'
import NavigationRail from './Components/NavigationRail/NavigationRail'
import ChatPage from './Components/ChatPage/ChatPage'

function App() {
  const [theme, setTheme] = useState('light')

  useEffect(()=>{
    console.log("running theme effect",theme)
    document.documentElement.setAttribute('theme',theme)
  },[theme])

  return (
    <div className="MainPage">
      <NavigationRail/>
      <ChatPage/>
    </div>
  )
}

export default App
