//cards displayed for single user
import React from 'react'
import { Card } from './Card'

export const CardHand = ({cards, setDrop}) => {
    
    return (
        <>
            <h3>Manas kartis</h3>
            {
                cards &&
                <div>

                    {
                        cards.map((card, i) => {
                            return <Card key={i} card={card} setDrop={setDrop}/>
                        })
                    }
                </div>

            }
        </>
    )
}