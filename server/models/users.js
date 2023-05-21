const db = require("./db");

const getUserByNameAndPasword = async (email, password) => {
  const sql = "SELECT * FROM users WHERE user_email = ? AND user_password = ?";
  const [rows, fields] = await db.query(sql, [email, password]);
  return rows[0];
};

const getUserDetailById = async (user_id) => {
  const sql =
    "SELECT user_id, user_email, user_password, user_fname, user_lname, user_role, user_phone, user_locat, \
    IFNULL(file_path, '') AS file_path\
    FROM users \
    LEFT JOIN image using (user_id) \
    WHERE user_id = ?";
  const [rows, fields] = await db.query(sql, [user_id]);0
  return rows[0];
};

const registerUser = async (user_id, user_role, user_email, user_password, user_fname, user_lname, user_phone, user_locat) => {
  console.log(user_email)
  const sql =
    "insert into users(user_id, user_role, user_email, user_password, user_fname, user_lname,user_phone,user_locat) values(?, ?,?,?,?,?,?,?)";
  const [rows, fields] = await db.query(sql, [
    user_id,
    user_role,
    user_email,
    user_password,
    user_fname,
    user_lname,
    user_phone,
    user_locat
  ]);
  return rows;
};

const updatePassword = async (user_id, password) => {
  const sql = "update users set user_password= ? where user_id = ?";
  const [rows, fields] = await db.query(sql, [password, user_id]);
  return rows;
};
const updateEmail = async  (user_id, email) =>{
  const sql = "update users set user_email= ? where user_id = ?";
  const [rows, fields] = await db.query(sql, [email, user_id]);
  return rows;
}
const updatePhone = async (user_id, phone) =>{
  const sql = "update users set user_phone= ? where user_id = ?";
  const [rows, fields] = await db.query(sql, [phone, user_id]);
  return rows;
}

// test uplaad to table testimage ถ้าจะ upจริงๆ ให้ไปสร้าง table ใหม่ ตอนนี้ยังไม่มี
const insertProfilePicture = async (file_path, picture_type, user_id) => {
  const sql = "insert into image(file_path, picture_type, user_id) values(?,?,?)";
  const [rows, fields] = await db.query(sql, [file_path, picture_type, user_id]);
  return rows;
};

// update role  user // note yet
const updateRoleUser = async (user_id, role, file_name) => {
  console.log("update role user");
  const sql = "update users set user_role = ? where user_id = ?";
  const [rows, fields] = await db.query(sql, [role, user_id]);
  // test
  insertProfilePicture(2, file_name);
  return rows;
};

module.exports = {
  getUserByNameAndPasword,
  getUserDetailById,
  registerUser,
  updatePassword,
  insertProfilePicture,
  updateRoleUser,
  updateEmail,
  updatePassword,
  updatePhone
};