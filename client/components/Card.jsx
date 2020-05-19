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
            const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientX = clientOffset.x - hoverBoundingRect.left

            if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
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