import React, { useState, useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

import { CardHand } from './CardHand'
import { CardsNew } from './CardsNew'
import { CardsOld } from './CardsOld'
import { MyCombinations } from './MyCombinations'
import { AllPlayerDeck } from './AllPlayerDeck'

export const CardDeck = ({ socket }) => {
  const [cards, setCards] = useState([])
  const [deck, setDeck] = useState([])
  const [combinations, setCombinations] = useState([])
  const [allDeck, setAllDeck] = useState([])
  const [take, setTake] = useState()
  const [count, setCount] = useState()
  const [drop, setDrop] = useState()
  const [myTurn, setMyTurn] = useState(false)
  
  useEffect(() => {
    // console.log(socket._callbacks)
    
    socket.once('get cards', cardData => {
      const { cards, newDeck, cardCount, turn } = cardData
      setCards(cards)
      setDeck([...deck, newDeck])
      setCount(cardCount)
      setMyTurn(turn)
    })
    socket.once('next card', card => setCards([...cards, card]))
    socket.once('change deck', deck => setDeck(deck))
    socket.once('new count', newCount => setCount(newCount))
    socket.once('picked card', () => {
      let newDeck = [...deck]
      newDeck.pop()
      setDeck(newDeck)
    })
    socket.once('drop card', card => setDeck([...deck, card]))
    socket.once('next turn', turn => setMyTurn(turn))
    
  }, [deck, cards, combinations, allDeck, take, count, drop, myTurn])
    
    if(count == 0){
    alert('TU UZVAREJI!!!')
  }

  if (take) {
    let newHand = [...cards, take]
    let newDeck = [...deck]

    newDeck.pop()
    socket.emit('picked card')

    setDeck(newDeck)
    setCards(newHand)
    setTake('')
  }

  if (drop) {
    let newHand = [...cards]
    let newDeck = [...deck, drop]

    newHand.splice(cards.indexOf(drop), 1)
    socket.emit('drop card', drop)

    setDeck(newDeck)
    setCards(newHand)
    setDrop('')
  }

  function attemptDrop(card) {
    if (cards.length == count+1) {
      setDrop(card)
      socket.emit('next turn')
    }
  }
  function attemptTake(card) {
    if (cards.length == count && myTurn) {
      setTake(card)
    }
  }

  function nextCard() {
    if (cards.length == count && myTurn){
        socket.emit('next card')
    }
  }

  function sendToAllDeck(combo) {
    setCombinations([])
    setAllDeck(combo)
    let remainingCards = [...cards].filter(card => !combo.includes(card))
    setCards(remainingCards)
  }

  return (
    <div>
      <DndProvider backend={Backend}>
        <div className='Dflex'>

            <CardsNew nextCard={nextCard} />
            <CardsOld deck={[...deck]} setTake={attemptTake} />

          <CardHand cards={[...cards]} combinations={[...combinations]} setDrop={attemptDrop} setCards={setCards} />
        </div>
        <MyCombinations combinations={[...combinations]} sendToAllDeck={sendToAllDeck} setCards={setCombinations} cards={[...cards]} />
        <h3>Galds</h3>
        <AllPlayerDeck cards={[...allDeck]} setAllDeck={setAllDeck} socket={socket} />
      </DndProvider>
    </div>
  )
}

//drag n drop lai sakartotu kartis