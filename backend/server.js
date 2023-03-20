const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const user = require('./routes/user')
app.use(express.json())

//user management
app.use('/api',user)


app.listen(3000, ()=>{
    console.log('listening on port 3000')
})