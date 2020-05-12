function generateTwoCardDecks(){
    //with 4 jokers default
    const cardValues = ['2','3','4','5','6','7','8','9','10','J','Q','K','A']
    const cardSuits = ['H','D','C','S']
    //2,3,4,5,6,7,8,9,10,J,Q,K,A A - Hearts
    //2,3,4,5,6,7,8,9,10,J,Q,K,A B - Diamonds
    //2,3,4,5,6,7,8,9,10,J,Q,K,A C - Clubs
    //2,3,4,5,6,7,8,9,10,J,Q,K,A D - Spades
    //4x Jokers
    let TwoDecksArr = []
    for (let i = 0; i < cardSuits.length; i++) {
        for (let j = 0; j < cardValues.length; j++) {
            TwoDecksArr.push({[cardSuits[i]]: cardValues[j]})
            TwoDecksArr.push({[cardSuits[i]]: cardValues[j]})
        }
        TwoDecksArr.push({[cardSuits[i]]: 'Joker'})
    }
    return TwoDecksArr
}

function shuffleTheDeck(deck){
    for (let i = 0; i < 1000; i++) {
        let id1 = Math.floor(Math.random() * deck.length)
        let id2 = Math.floor(Math.random() * deck.length / 2)

        if(id1 != id2){
            let temp = deck[id1]
            deck[id1] = deck[id2]
            deck[id2] = temp
        }
        
    }
    return deck
}

function prepareTheDeck(count){
    let deck = shuffleTheDeck(generateTwoCardDecks())
    
    let finishedDeck = []
    for (let j = 0; j < count; j++) {
        finishedDeck.push({
            [`player${j+1}`]:[]
        })

        for (let i = 0; i < 12; i++) {
            let id = Math.floor(Math.random() * deck.length)
            finishedDeck[j][`player${j+1}`].push(deck[id])
            deck.splice(id,1)
        }
    }

    finishedDeck.push({
        deck: deck
    })

    return finishedDeck
}

module.exports = {
    prepareTheDeck
}