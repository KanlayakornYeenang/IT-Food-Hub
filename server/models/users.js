const db = require("./db");

const getUserByNameAndPasword = async (email, password) => {
  const sql = "SELECT * FROM users WHERE user_email = ? AND user_password = ?";
  const [rows, fields] = await db.query(sql, [email, password]);
  return rows[0];
};

const getUserDetailById = async (user_id) => {
  const sql = "SELECT user_email, user_fname, user_lname FROM users WHERE user_id = ?";
  const [rows, fields] = await db.query(sql, [user_id]);
  return rows[0];
};

const getAllRestaurant = async () => {
  const sql = "SELECT * FROM restaurants";
  const [rows, fields] = await db.query(sql);
  return rows;
}
const getAllUser = async () => {
  const sql = "SELECT * FROM users";
  const [rows, fields] = await db.query(sql);
  return rows
}

const registerUser = async (fname, lname, email,password,)=>{
  const sql = "insert into users(user_fname, user_lname, user_email, user_password, user_role) values(?,?,?,?,?)"
  const [rows,fields] = await db.query(sql, [fname, lname, email, password, "customer"])
  return rows
}

const updatePassword = async(user_id, password)=>{
  const sql = "update users set user_password= ? where user_id = ?";
  const [rows,fields] = await db.query(sql,[ password, user_id])
  return rows
}

// test uplaad to table testimage ถ้าจะ upจริงๆ ให้ไปสร้าง table ใหม่ ตอนนี้ยังไม่มี
const insertProfilePicture = async(image_id, file_name)=>{
  const sql = "insert into testimages(image_id, file_path) values(?,?)"
  const [rows, fields] = await db.query(sql,[image_id, file_name])
  return rows
  
}

// update role  user // note yet
const updateRoleUser = async (user_id, role, file_name)=>{
    console.log("update role user")
    const sql = "update users set user_role = ? where user_id = ?"
    const [rows, fields] = await db.query(sql,[role, user_id])
    // test
    insertProfilePicture(2, file_name)
    return rows
  
}


module.exports = { 
  getUserByNameAndPasword, 
  getUserDetailById, 
  getAllRestaurant, 
  registerUser, 
  getAllUser, 
  updatePassword, 
  insertProfilePicture,
  updateRoleUser
};
