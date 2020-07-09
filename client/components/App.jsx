import React from 'react'
import io from 'socket.io-client'
import { CardDeck } from './CardDeck'
import { ChatBox } from './ChatBox'

//when deploying io('/')
let socket = io(':3000')

const App = () => {


  return (
    <>
      <h1>Edgars Card Game</h1>
      <div className='Dflex'>
        <ChatBox socket={socket} />
        <button id='start' onClick={() => socket.emit('get cards')}>START</button>
        <CardDeck socket={socket} />
      </div>
    </>
  )
}

export default App
