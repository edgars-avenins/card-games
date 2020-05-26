import React, { useState, useEffect } from 'react'
import { altCards } from '../utils'

export const AllPlayerDeck = ({ cards, setAllDeck, socket }) => {
    const [deck, setDeck] = useState([])
    if (cards.length != 0) {
        socket.emit('all deck', cards)
        cards = []
        setAllDeck(cards)
    }

    useEffect(() => {
        socket.once('all deck', data => {
            console.log('shouldn\'t be here!!')
            
            setDeck([...deck, data])
        })
    },[cards, deck])

    return (
        <>
            <h3>All player combinations</h3>
            {
                deck.map((combination, i) => (
                    <div key={i+100}>
                        {
                            combination.map((card, i) => {
                                return <span key={i}>
                                    <img src={`/images/cards/card-${card.suit}-${card.value}.png`} alt={altCards.value[card.value] + ' of ' + altCards.suit[card.suit]} />
                                </span>
                            })

                        }
                    </div>
                ))
            }
        </>
    )
}