const PORT = 7000;
const io = require('socket.io')(PORT, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true
    }
})

io.on('connection', socket => {
    // console.info(`Socket connected PORT: ${PORT}`)
    const id = socket.handshake.query.id
    socket.join(id)

    socket.on('send-message', ({recipients, text}) => {
        recipients.forEach(recipient => {
            const newRecipients = recipients.filter(r => r !== recipient)
            newRecipients.push(id)
            socket.broadcast.to(recipient).emit('receive-message', {
                recipients: newRecipients, sender: id, text
            })
        })
    })
})

