const express = require('express');
const router =  express.Router()
const jwt = require('jsonwebtoken')
const pool = require('../config/config')
let refreshTokens = []
const users = [
    {
        id : "1",
        email : "vorawee@gmail.com",
        password : "vorawee",
        isOwnner : true,
        isDeliver : true,
    },
    {
        id : "2",
        email : "mukrob@gmail.com",
        password : "mukrob",
        isAdmin : false,
        isOwner : true,
    }
]

router.use(express.json())

router.post("/refresh", (req, res)=>{
    // take the refresh token from the user
    const refreshToken = req.body.token
    console.log("test"+ refreshTokens)

    //send error if there is no token or it's invalid
    if(!refreshToken) return res.status(404).json("You are not authenticated")
    if(!refreshTokens.includes(refreshToken)){
        return res.status(403).json("Refresh token is invalid")
    }
    jwt.verify(refreshToken, "myRefreshSecretKey",(err, user)=>{
        err && console.log(err)
        refreshTokens = refreshTokens.filter(token=> token !== refreshToken)
        
        const newAccessToken = generateAccessToken(user)
        const newRefreshAccessToken = generateRefreshToken(user)

        refreshTokens.push(newRefreshAccessToken)

        res.status(200).json({
            accessToken : newAccessToken,
            refreshToken : newRefreshAccessToken
        })
    })

    //if everything is ok, create a new token, refresh abd sebd tijeb
})

const generateAccessToken = (user) =>{
    return jwt.sign({id: user.id, isAdmin : user.isAdmin}, 
        "mySecretKey",
        {expiresIn :"15m"}
        )}
const generateRefreshToken = (user) =>{
    return jwt.sign({id: user.id, isAdmin : user.isAdmin}, 
        "myRefreshSecretKey"
        )}

router.post('/login',  async (req,res)=>{
    // query email and password for login
    const [rows, field] =  await pool.query('SELECT Customer_email , Customer_password, Customer_isDelivery, Customer_isOwner FROM customer')
    const {email, password} = req.body;
    const user = rows.find(u=>{
        return u.Customer_email === email && u.Customer_password === password
    })
    if(user){
    
        //Generate an access token
        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)
        refreshTokens.push(refreshToken)
        res.json({
            Customer_email : user.Customer_email,
            Customer_password : user.Customer_password,
            isOwner : user.Customer_isOwner,
            isDelivery : user.Customer_isDelivery,
            accessToken,
            refreshToken,
            rows
        })
        
    }else{
        res.status(400).json("username or password is incorrect") 
    }


})


const verify = (req, res, next) =>{
    // send Token in req Headers
    const authnHeader = req.headers.authorization
    if(authnHeader){
        const token = authnHeader.split(" ")[1]
        jwt.verify(token, "mySecretKey", (err, user)=>{
            if(err){
                return res.status(401).json("Token is not valid")
            }
            req.user = user
            next()
        })
    }else{
        res.status(401).json("You are not authorized to access this")
    }
}
router.delete("/users/:userId", verify,(req, res)=>{
    if(req.user.id === req.params.userId || req.user.isAdmin){
        res.status(200).json("User has been delete")
    }else{
        res.status(403).json("You are not allowed to")
    }
})
router.post("/logout", verify, (req, res) => {
    
    const refreshToken = req.body.token
    refreshTokens = refreshTokens.filter(token => token !== refreshToken)
    res.status(200).json("You logged out successfully")

})

router.post("/registerTest", (req,res)=>{
    // ชื่อ นามสกุล อีเมล และ พาสเวริด จะส่งผ่านยัง req.body
    const {first_name, last_name, email, password} = req.body
    res.json({ 
        fistName: req.body.first_name, 
        lastName: req.body.last_name, 
        email: req.body.email, 
        password: req.body.password})
})

router.get('/', (req, res)=>{
    res.send('hello')
})

module.exports = router 