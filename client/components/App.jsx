import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import io from 'socket.io-client'

let socket = io(':3000')

const App = () => {
  const [ messages, setMessages ] = useState(['More messages following!'])

  const { register, handleSubmit, reset } = useForm()
  const onNameSubmit = data => {
    socket.emit('user name', data)
    reset({name: ''})
  }
  const onSubmit = data => {
    socket.emit('chat message', data)
    setMessages([...messages, {my: true, message: data.message}])
    reset({message: ''})
  }
  
  socket.once('chat message', (message) => setMessages([...messages, message]))
  
  console.log(messages)
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
            message.my ? 
              <div key={i} id='myMsg'>{message.message}</div>
            :
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
