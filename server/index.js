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

let names = {}
const data = cards.prepareTheDeck(4) // generate new one on new room creation
const firstCard = data.deck.pop()
io.on('connection', socket => {
  console.log('User connected')

  socket.on('user name', name => {
    names[socket.id] = name.name
    socket.broadcast.emit('joined', names[socket.id])
  })
  
  socket.on('chat message', message => {
    socket.broadcast.emit('chat message', { name:names[socket.id], message: message.message})
  })
  
  socket.on('get cards', () => {
    let keys = Object.keys(data)
    Object.keys(names).map((item, i) => {
      
      return io.to(item).emit('get cards', {cards: data[keys[i]], deck: firstCard})
    })
  })
  
  socket.on('next card', () => {
    console.log(data.deck)
    io.to(socket.id).emit('next card', data.deck.pop())
  })

  socket.on('disconnect', () => {
    console.log('User disconnected')
  })
})

//if I want to use this exact io somewhere else I have to pass it as function arg(remember simons timer issue) https://github.com/piwakawaka-2020/SpacePants-backEnd/blob/dev/server/index.js

const port = process.env.PORT || 3000

http.listen(port, function () {
  // eslint-disable-next-line no-console
  console.log('Listening on port', port)
})
