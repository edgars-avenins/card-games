import React from 'react'

export const CardsNew = ({nextCard}) => {

    return (
        <div>
            <img onClick={nextCard} src="/images/cards/card-flip.png" alt="backside of card" />
        </div>
    )
}