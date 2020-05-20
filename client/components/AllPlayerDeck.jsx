import React, { useState } from 'react'
import { altCards } from '../utils'

export const AllPlayerDeck = ({ cards, setAllDeck, socket }) => {
    const [deck, setDeck] = useState([])
    if (cards.length != 0) {
        socket.emit('all deck', cards)
        cards = []
        setAllDeck(cards)
    }

    socket.once('all deck', data => setDeck([...deck, data]))

    return (
        <>
            <h3>All player combinations</h3>
            {
                deck.map(combination => (
                    combination.map((card, i) => {
                        return <span key={i}>
                            <img src={`/images/cards/card-${card.suit}-${card.value}.png`} alt={altCards.value[card.value] + ' of ' + altCards.suit[card.suit]} />
                        </span>
                    })
                ))
            }
        </>
    )
}