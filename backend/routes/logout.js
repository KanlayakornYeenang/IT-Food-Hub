const express = require('express');
const router =  express.Router()
app.post("/api/logout", verify, (req, res) => {
    const refreshToken = req.body.token
    refreshTokens = refreshTokens.filter(token => token !== refreshToken)
    res.status(200).json("You logged out successfully")

})