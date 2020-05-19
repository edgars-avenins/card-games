import React, { useState } from 'react'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

import { CardHand } from './CardHand'
import { CardsNew } from './CardsNew'
import { CardsOld } from './CardsOld'

export const CardDeck = ({socket}) => {
    const [ cards, setCards ] = useState([])
    const [ deck, setDeck ] = useState([])
    const [ take, setTake ] = useState()
    const [ drop, setDrop ] = useState()
    
    socket.once('get cards', cardData => {
        const {cards, newDeck} = cardData
        setCards(cards)
        setDeck([...deck, newDeck])
      })
    socket.once('next card', card => setCards([...cards, card]))
    socket.once('change deck', deck => setDeck(deck))
    
      // if(take && drop){
      //   let newCards = [...cards]
      //   newCards.splice(cards.indexOf(drop), 1, take)
      //   setCards(newCards)
      //   setDeck(drop)
      //   socket.emit('change deck', drop)
      //   setDrop('')
      //   setTake('')
      // }
      
      if(take){
        let newHand = [...cards, take]
        let newDeck = [...deck]

        newDeck.pop()

        setDeck(newDeck)
        setCards(newHand)
        setTake('')
      }
      
      if(drop){
        let newHand = [...cards]
        let newDeck = [...deck, drop]
        
        newHand.splice(cards.indexOf(drop), 1)

        setDeck(newDeck)
        setCards(newHand)
        setDrop('')
      }

      function attemptDrop(card){
        if(cards.length == 13){
          setDrop(card)
        }
      }
      function attemptTake(card){
        if(cards.length == 12){
          setTake(card)
        }
      }

      function nextCard(){
          if(cards.length == 12)
          socket.emit('next card')
      }

    return(
      <div>
        <DndProvider backend={Backend}>
          <CardHand cards={[...cards]} setDrop={attemptDrop} setCards={setCards}/>

          <h3>Galds</h3>
          <CardsNew nextCard={nextCard} />
          <CardsOld deck={[...deck]} setTake={attemptTake} />
        </DndProvider>
      </div>
    )
}

//drag n drop lai sakartotu kartis