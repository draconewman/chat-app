// Node server; handles socket io connections

const io = require('socket.io')(4000,{
    cors: {
      origin: '*',
    }
  });

const users = {}

io.on('connection', socket => {
    // if any new user joins, let other users know
    socket.on('new-user-joined', name => {
        //console.log("New user", name)
        users[socket.id] = name
        socket.broadcast.emit('user-joined', name)
    })

    // if any user sends a message, broadcast it to all other users
    socket.on('send', message => {
        socket.broadcast.emit('receive', {
            message: message,
            name: users[socket.id]
        })
    })
    
    //     socket.on('imgsend', imgmsg => {
    //     socket.broadcast.emit('imgreceive', {
    //         imgmsg: imgmsg,
    //         name: users[socket.id]
    //     })
    // })

    // if someone leaves the chat, let other users know
    // Note: here 'disconnect' is a built-in event
    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id])
        delete users[socket.id]
    })

    // for sending image
    socket.on('user image', function (msg) {
        //Received an image, broadcast to all users
        socket.broadcast.emit('user image', users[socket.id], msg)
    })
})
