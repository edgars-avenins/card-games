//cards displayed for single user
import React, { useCallback } from 'react'
import { Card } from './Card'
import update from 'immutability-helper'


export const CardHand = ({cards, setDrop, setCards}) => {
    
    const moveCard = useCallback(
        (dragIndex, hoverIndex) => {
          const dragCard = cards[dragIndex]
          console.log(dragIndex, hoverIndex)
          setCards(
            update(cards, {
              $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragCard],
              ],
            }),
          )
        },
        [cards],
        console.log(cards)
      )

    return (
        <>
            <h3>Manas kartis</h3>
            {
                cards &&
                <div>

                    {
                        cards.map((card, i) => {
                            return <Card key={i} moveCard={moveCard} card={card} index={i} setDrop={setDrop}/>
                        })
                    }
                </div>

            }
        </>
    )
}