import React from 'react'

export const CardsOld = ({deck, setTake}) => {

    function returnLast(){
      let last = deck.pop()
      
      return (
        <span><img onClick={() => setTake(last)} src={`/images/cards/card-${last.suit}-${last.value}.png`} alt=""/></span>
      )
    }


    return(
        <div>
            {
              deck.length > 0 &&
              returnLast()
            }
          </div>
    )
}