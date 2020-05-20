import React, { useState } from 'react'
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

  socket.once('get cards', cardData => {
    const { cards, newDeck, cardCount } = cardData
    setCards(cards)
    setDeck([...deck, newDeck])
    setCount(cardCount)
  })
  socket.once('next card', card => setCards([...cards, card]))
  socket.once('change deck', deck => setDeck(deck))
  socket.once('new count', newCount => setCount(newCount))
  socket.once('picked card', () => {
    let newDeck = [...deck]
    newDeck.pop()
    setDeck(newDeck)
  })

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

    setDeck(newDeck)
    setCards(newHand)
    setDrop('')
  }

  function attemptDrop(card) {
    if (cards.length == count+1) {
      setDrop(card)
    }
  }
  function attemptTake(card) {
    if (cards.length == count) {
      setTake(card)
    }
  }

  function nextCard() {
    if (cards.length == count)
      socket.emit('next card')
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