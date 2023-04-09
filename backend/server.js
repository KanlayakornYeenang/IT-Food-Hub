const express = require('express')

const app = express()
const jwt = require('jsonwebtoken')
const user = require('./routes/user')
const cors = require('cors')
const PORT = 5000

app.use(express.json())
app.use(cors())

//user management
app.use('/api',user)

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})