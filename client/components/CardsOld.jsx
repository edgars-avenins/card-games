import React from 'react'

export const CardsOld = ({deck, setTake}) => {

    return(
        <div>
            {
              deck &&
              <span><img onClick={() => setTake(deck)} src={`/images/cards/card-${deck.suit}-${deck.value}.png`} alt=""/></span>
            }
          </div>
    )
}