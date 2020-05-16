//all cards
import React, { useState } from 'react'
import { CardHand } from './CardHand'
import { CardsNew } from './CardsNew'
import { CardsOld } from './CardsOld'

export const CardDeck = ({socket}) => {
    const [ cards, setCards ] = useState([])
    const [ deck, setDeck ] = useState()
    const [ take, setTake ] = useState()
    const [ drop, setDrop ] = useState()
    
    socket.once('get cards', cardData => {
        const {cards, deck} = cardData
        setDeck(deck)
        setCards(cards)
      })
    socket.on('next card', card => setCards([...cards, card]))
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
console.log(cards)
      function nextCard(){
          socket.emit('next card')
      }

    return(
        <div>
          <CardHand cards={cards} setDrop={setDrop}/>

          <h3>Galds</h3>
          <CardsNew nextCard={nextCard} />
          <CardsOld deck={deck} setTake={setTake} />
        </div>
    )
}

//padoma par flowu, ja spied uz aizsegtas karts tad tu vinu pacel, jaspied uz atklatas, tad ari pacel... ka stradas nomesana? 