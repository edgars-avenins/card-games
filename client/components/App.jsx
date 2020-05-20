import React from 'react'
import io from 'socket.io-client'
import { CardDeck } from './CardDeck'
import { ChatBox } from './ChatBox'

//when deploying io('/')
let socket = io(':3000')

const App = () => {
 

  return (
    <div className='Dflex'>
      <h1>Laiks uzspelet Jokeru!</h1>
      <ChatBox socket={socket} />

      <CardDeck socket={socket} />
    </div>

  )
}

export default App
