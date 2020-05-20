import React from 'react'
import { useDrop } from 'react-dnd'
import { ItemTypes, altCards } from '../utils'


export const MyCombinations = ({ setCards, combinations, sendToAllDeck }) => {
    const [, drop] = useDrop({
        accept: ItemTypes.CARD,
        drop(item, monitor) {
            setCards([...combinations, item.card])
        }
    })


    return (
        <div>
            <h3>Manas kombinacijas</h3>
            <div ref={drop} style={{border: '1px solid red', width: '50vw', height: '5rem'}}>
                {
                    combinations.map((card, i) => {
                        return <span key={i}>
                            <img src={`/images/cards/card-${card.suit}-${card.value}.png`} alt={altCards.value[card.value] + ' of ' + altCards.suit[card.suit]} />
                        </span>
                    })
                }
            </div>
            <button onClick={() => sendToAllDeck(combinations)}>IZLIKTIES</button>
        </div>
    )
}