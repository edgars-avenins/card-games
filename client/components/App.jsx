import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import io from 'socket.io-client'

//when deploying io('/')
let socket = io(':3000')

const App = () => {
  const [ messages, setMessages ] = useState([])
  const [ cards, setCards ] = useState()
  const [ deck, setDeck ] = useState()
  const [ take, setTake ] = useState()
  const [ drop, setDrop ] = useState()


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
  socket.once('joined', name => setMessages([...messages, name]))
  socket.once('get cards', cardData => {
    const {cards, deck} = cardData
    setDeck(deck)
    setCards(cards)
  })
  socket.on('next card', deck => setDeck(deck))
  socket.on('change deck', deck => setDeck(deck))

  if(take && drop){
    let newCards = [...cards]
    newCards.splice(cards.indexOf(drop), 1, take)
    setCards(newCards)
    setDeck(drop)
    socket.emit('change deck', drop)
    setDrop('')
    setTake('')
  }

  function nextCard(){
    socket.emit('next card')
  }
  
  
  return (
    <div>
      <h1>Laiks uzspelet Jokeru!</h1>
      <form onSubmit={handleSubmit(onNameSubmit)}>
        <input type="text" name='name' ref={register} />
        <input type="submit"/>
      </form>
      <div className='Dflex'>
        <div id='chatbox'>
        {
            messages.map((message,i) => (
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
        <div>
          <h3>Manas kartis</h3>
          {
            cards &&
            <div>

              {
                cards.map((card, i) =>{
                  return <span key={i}><img onClick={() => setDrop(card)} src={`/images/cards/card-${card.suit}-${card.value}.png`} alt=""/></span>
                })
              }
              </div>
           
          }
          <h3>Galds</h3>
          <div>
            <img onClick={nextCard} src="/images/cards/card-flip.png" alt="backside of card"/>
          </div>
          <div>
            {
              deck &&
              <span><img onClick={() => setTake(deck)} src={`/images/cards/card-${deck.suit}-${deck.value}.png`} alt=""/></span>
            }
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" name='message' ref={register} />
        <input type="submit"/>
      </form>
      <button onClick={()=> socket.emit('get cards')}>Get Cards</button>
    </div>
  )
}

export default App
