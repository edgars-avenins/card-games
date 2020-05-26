const app = require('./server')
const db = require('../models')
const cards = require('./logic/logic')
const http = require('http').createServer(app)
const io = require('socket.io')(http)



//check db connection
db.sequelize.authenticate()
  .then(() => {
    console.log('Success!!')
  })
  .catch(err => {
    console.error('Failure!!', err)
  })

let users = {}
let userArr = []
let data = {} // generate new one on new room creation
let turn = 0
let firstCard = ''
io.on('connection', socket => {
  console.log('User connected')

  socket.on('user name', user => {
    users[socket.id] = {}
    users[socket.id]['cards'] = 12
    users[socket.id]['name'] = user.name

    console.log(users)
    socket.broadcast.emit('joined', users[socket.id].name)
  })
  
  socket.on('chat message', message => {
    socket.broadcast.emit('chat message', { name:users[socket.id].name, message: message.message})
  })
  
  socket.on('get cards', () => {
    data = cards.prepareTheDeck(Object.keys(users).length)
    userArr = Object.keys(users)
    firstCard = data.deck.pop()
    let keys = Object.keys(data)
    Object.keys(users).map((item, i) => {
      
      io.to(item).emit('get cards', {cards: data[keys[i]], newDeck: firstCard, cardCount: users[item]['cards'], turn: i==turn ? true : false})
    })
  })

  socket.on('all deck', cards => {
    users[socket.id]['cards'] -= cards.length
    Object.keys(users).map(item => {
      if(item == socket.id){
        io.to(socket.id).emit('new count', users[socket.id]['cards'])
      }
      io.to(item).emit('all deck', cards)
    })
  })
  
  socket.on('change deck', card => {
    socket.broadcast.emit('change deck', card)
  })
  
  socket.on('next card', () => {

    let nextCard = data.deck.pop()
    socket.emit('next card', nextCard)
  })

  socket.on('picked card', () => {
    socket.broadcast.emit('picked card')
  })
  
  socket.on('drop card', card => {
    socket.broadcast.emit('drop card', card)
  })

  socket.on('next turn', () => {
    if(turn == userArr.length - 1) turn = 0
    else turn++
    userArr.map((user, i) => (
      io.to(user).emit('next turn', turn == i ? true : false)
    ))
  })

  socket.on('disconnect', () => {
    delete users[socket.id]
    console.log(users)
    console.log('User disconnected')
  })
})

//if I want to use this exact io somewhere else I have to pass it as function arg(remember simons timer issue) https://github.com/piwakawaka-2020/SpacePants-backEnd/blob/dev/server/index.js

const port = process.env.PORT || 3000

http.listen(port, function () {
  // eslint-disable-next-line no-console
  console.log('Listening on port', port)
})
