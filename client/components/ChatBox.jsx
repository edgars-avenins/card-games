import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

export const ChatBox = ({ socket }) => {
    const [messages, setMessages] = useState([])



    const { register, handleSubmit, reset } = useForm()
    const onNameSubmit = data => {
        socket.emit('user name', data)
        reset({ name: '' })
    }
    const onSubmit = data => {
        socket.emit('chat message', data)
        setMessages([...messages, { my: true, message: data.message }])
        reset({ message: '' })
    }

    socket.once('chat message', (message) => setMessages([...messages, message]))
    socket.once('joined', name => setMessages([...messages, name]))


    return (
        <div>
            <form onSubmit={handleSubmit(onNameSubmit)}>
                <input type="text" name='name' ref={register} />
                <input type="submit" />
            </form>
            <div id='chatbox'>
                {
                    messages.map((message, i) => (
                        //remake this into a function as there might be several types of messages coming into this chatbox
                        message.my ?
                            <div key={i} id='myMsg'>{message.message}</div>
                            :
                            message.message ?
                                <div key={i}><span id='name'>{message.name}</span> says: <span id='message'>{message.message}</span></div>
                                :
                                <div>{message} has joined the chat</div>
                    ))
                }
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" name='message' ref={register} />
                <input type="submit" />
            </form>
            <button onClick={() => socket.emit('get cards')}>Get Cards</button>
        </div>
    )
}