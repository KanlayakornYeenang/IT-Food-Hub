const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
app.use(express.json())

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

let refreshTokens = []
// regenerate Token
app.post("/api/refresh", (req, res)=>{
    // take the refresh token from the user
    const refreshToken = req.body.token
    console.log(refreshTokens)

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
// Login
app.post("/api/login", (req, res)=>{
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

app.delete("/api/users/:userId", verify,(req, res)=>{
    if(req.user.id === req.params.userId || req.user.isAdmin){
        res.status(200).json("User has been delete")
    }else{
        res.status(403).json("You are not allowed to")
    }
})
app.post("/api/logout", verify, (req, res) => {
    const refreshToken = req.body.token
    refreshTokens = refreshTokens.filter(token => token !== refreshToken)
    res.status(200).json("You logged out successfully")

})

app.listen(3000, ()=>{
    console.log('listening on port 3000')
})