const express = require('express')

const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = process.env.PORT || 3000

const app = express()

const db =require('./models/index')
db.sequelize.sync()

var corsOptions = {
    origin: "http://localhost:8081"
  };

app.use(cors(corsOptions));
app.get("/", (req,res)=>{
    res.send("hello")
})

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})