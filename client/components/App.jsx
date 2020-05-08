import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import io from 'socket.io-client'

let socket = io(':3000')

const App = () => {
  const [ messages, setMessages ] = useState(['More messages following!'])

  const { register, handleSubmit } = useForm()
  const onNameSubmit = data => socket.emit('user name', data)
  const onSubmit = data => socket.emit('chat message', data)

  socket.once('chat message', (message) => setMessages([...messages, message]))

  return (
    <div>
      <h1>Tinkering with sockets has begun!</h1>
      <form onSubmit={handleSubmit(onNameSubmit)}>
        <input type="text" name='name' ref={register} />
        <input type="submit"/>
      </form>
      <div id='chatbox'>
      {
          messages.map((message,i) => (
            <div key={i}>{message}</div>
          ))
        }
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" name='message' ref={register} />
        <input type="submit"/>
      </form>
    </div>
  )
}

export default App
