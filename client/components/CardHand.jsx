//cards displayed for single user
import React from 'react'

export const CardHand = ({cards, setDrop}) => {

    return (
        <>
            <h3>Manas kartis</h3>
            {
                cards &&
                <div>

                    {
                        cards.map((card, i) => {
                            return <span key={i}><img onClick={() => setDrop(card)} src={`/images/cards/card-${card.suit}-${card.value}.png`} alt="" /></span>
                        })
                    }
                </div>

            }
        </>
    )
}