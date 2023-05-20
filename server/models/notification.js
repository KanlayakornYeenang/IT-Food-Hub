const db = require("./db");

const insertNoti = async (user_id, order_id, message) =>{
    const sql = "insert into notification(user_id, order_id, time_stamp, message) values(?, ?, CURRENT_TIMESTAMP, ?)"
    const [rows, fields] = await db.query(sql, [user_id, order_id, message])
    return rows
}
const getNotiById = async (user_id) =>{
  const sql = "select * from notification where user_id = ?";
  const [rows, fields] = await db.query(sql,  user_id);
  return rows;
}

module.exports = {
    getNotiById,
    insertNoti
}  