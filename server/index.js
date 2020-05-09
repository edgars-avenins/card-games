const app = require('./server')
const http = require('http').createServer(app)
const io = require('socket.io')(http)

let names = {}

io.on('connection', socket => {
  console.log('User connected')

  socket.on('user name', name => {
    console.log(name)
    names[socket.id] = name.name
  })

  socket.on('chat message', message => {
    console.log('message: ' + message.message)
    socket.broadcast.emit('chat message', names[socket.id] + ' says: ' + message.message)
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
