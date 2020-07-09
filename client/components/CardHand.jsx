//cards displayed for single user
import React, { useCallback } from 'react'
import { Card } from './Card'
import update from 'immutability-helper'


export const CardHand = ({cards, combinations, setDrop, setCards}) => {
    
    const moveCard = useCallback(
        (dragIndex, hoverIndex) => {
          const dragCard = cards[dragIndex]
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
      )

    return (
        <>
            <h3>My Cards</h3>
            {
                cards &&
                <div>

                    {
                        cards.map((card, i) => {
                            if(combinations.includes(card)){ //tad kad ievelku drop boxaa karti vajag padot indexu uz masivu un ja sis i ir taja masiva tad vinu te nerenderee
                              return
                            }else return <Card key={i} moveCard={moveCard} card={card} index={i} setDrop={setDrop}/>
                          })
                    }
                </div>

            }
        </>
    )
}