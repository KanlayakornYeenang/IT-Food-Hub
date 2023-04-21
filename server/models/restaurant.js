const db = require("./db");


// get all of restaurant
const getAllRestaurants = async()=>{
    const sql = "select * from restaurants"
    const [rows, fields] = await db.query(sql)
    return rows
}
module.exports = {getAllRestaurants}