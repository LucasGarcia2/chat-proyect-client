import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ChatClient } from './components/ChatClient/ChatClient'

function App() {

  return (
      <div className="App">
        <ChatClient />
      </div>
  )
}

export default App;
