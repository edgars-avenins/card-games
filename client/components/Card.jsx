import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import {ItemTypes, altCards} from '../utils'

export const Card = ({card, setDrop, index, moveCard}) => {
    const ref = useRef(null)
    const [{isDragging}, drag] = useDrag({
        item: {
            type:  ItemTypes.CARD,
            card, index
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    })

    const [, drop] = useDrop({
        accept: ItemTypes.CARD,
        hover(item, monitor){
            if(!ref.current){
                return
            }
            const dragIndex = item.index
            const hoverIndex = index

            if(dragIndex == hoverIndex){
                return
            }

            const hoverBoundingRect = ref.current.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset.y - hoverBoundingRect.top

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return
            }

            moveCard(dragIndex, hoverIndex)
            
            item.index = hoverIndex
        }
    })

    

    drag(drop(ref))
    return (
        <span>
            <img ref={ref}  style={{ opacity: isDragging ? 0.5 : 1 }} onClick={() => setDrop(card)} src={`/images/cards/card-${card.suit}-${card.value}.png`} alt={altCards.value[card.value] + ' of ' + altCards.suit[card.suit]} />
        </span>
    )
}