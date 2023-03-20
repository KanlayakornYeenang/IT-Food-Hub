const express = require('express');
const router =  express.Router()
const jwt = require('jsonwebtoken')
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
const generateAccessToken = (user) =>{
    return jwt.sign({id: user.id, isAdmin : user.isAdmin}, 
        "mySecretKey",
        {expiresIn :"15m"}
        )}
const generateRefreshToken = (user) =>{
    return jwt.sign({id: user.id, isAdmin : user.isAdmin}, 
        "myRefreshSecretKey"
        )}

router.post('/login', (req,res)=>{
    const {email, password} = req.body;
    const user = users.find(u=>{
        console.log(email,password)
        return u.email === email && u.password === password
    })
    if(user){
        //Generate an access token
        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)
        refreshTokens.push(refreshToken)
        res.json({
            email : user.email,
            isAdmin : user.isAdmin,
            accessToken,
            refreshToken
        })
    }else{
        res.status(400).json("username or password is incorrect") 
    }

})

module.exports = router