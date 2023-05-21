
const {getNotiById} = require("../../models/notification");

const getAllNotifi = async (req, res)=>{
    const user_id = req.user.user_id
    try{
       const result = await getNotiById(user_id)
       return res.send(result)
    }
    catch(err){
        return res.send("error: " + err)
    }
}

module.exports ={
    getAllNotifi
}