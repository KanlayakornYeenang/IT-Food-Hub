const db = require("./db");

const insertNoti = async (user_id, order_id, message) =>{
    const sql = "insert into notification(user_id, order_id, time_stamp, message) values(?, ?, CURRENT_TIMESTAMP, ?)"
    if(message == '1'){
      message = "กำลังจัดเตรียมอาหาร"
    }
    if(message == '2'){
      message = "กำลังไปจัดส่งอาหาร"
    }
    if(message == '3'){
      message = "จัดส่งเรียบร้อย"
    }
    const [rows, fields] = await db.query(sql, [user_id, order_id, message])
    return rows
}
const getNotiById = async (user_id) =>{
  const sql = "select * from notification where user_id = ? and isreaded is null";
  const [rows, fields] = await db.query(sql,  user_id);
  return rows;
}

module.exports = {
    getNotiById,
    insertNoti
}  