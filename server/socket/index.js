const socketIo = require('socket.io')
const cors = require('cors')
const PORT = 4114

const io = socketIo(PORT, {
    cors:{
        origin: 'http://localhost:3000', // Replace with your frontend URL
    }
})

module.exports = io