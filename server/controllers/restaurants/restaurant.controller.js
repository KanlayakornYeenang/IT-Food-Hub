const {getAllRestaurants} = require('../../models/restaurant');

const getRestaurants = async (req, res) =>{
    try{
        const result = await getAllRestaurants
        return  res.send(result)
    }catch(err){
        return res.status(404).send(err)
    }
}

module.exports = {getRestaurants}