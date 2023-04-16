const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const pool = require("../config/config");
const cors = require('cors')
let refreshTokens = [];
const socketIo = require('socket.io');
router.use(express.json());

router.post("/refresh", (req, res) => {
  // take the refresh token from the user
  const refreshToken = req.body.token;
  console.log("test" + refreshTokens);

  //send error if there is no token or it's invalid
  if (!refreshToken) return res.status(404).json("You are not authenticated");
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json("Refresh token is invalid");
  }
  jwt.verify(refreshToken, "myRefreshSecretKey", (err, user) => {
    err && console.log(err);
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

    const newAccessToken = generateAccessToken(user);
    const newRefreshAccessToken = generateRefreshToken(user);

    refreshTokens.push(newRefreshAccessToken);

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshAccessToken,
    });
  });
  //if everything is ok, create a new token, refresh abd sebd tijeb
});

const generateAccessToken = (user) => {
  // ตอนสร้าง token ต้องใส่ รายละเอียดเกี่ยวกับ user ที่ login เข้าไปด้วย ตอน verify จะได้ข้อมูลพวกนั้นมา
  return jwt.sign(
    { id: user.id, isAdmin: user.isAdmin, Customer_email: user.Customer_email },
    "mySecretKey",
    { expiresIn: "50m" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "myRefreshSecretKey");
};

//<--------------------------------------------------------Login user -------------------------------------------------------------->
router.post("/login", async (req, res) => {
  // query email and password for login
  const [rows, field] = await pool.query(
    "SELECT Customer_email , Customer_password, Customer_isDelivery, Customer_isOwner FROM customer"
  );
  console.log(rows)
  const { email, password } = req.body;
  console.log(email, "is trying to Login");
  const user = rows.find((u) => {
    return u.Customer_email === email && u.Customer_password === password;
  });

  if (user) {
    console.log(user.Customer_password, "is login successful");
    //Generate an access token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    refreshTokens.push(refreshToken);
    res.json({
      Customer_email: user.Customer_email,
      Customer_password: user.Customer_password,
      isOwner: user.Customer_isOwner,
      isDelivery: user.Customer_isDelivery,
      accessToken,
      refreshToken,
      rows,
    });
  } else {
    res.status(400).json("username or password is incorrect");
  }
});
//<-------------------------------------------------------middlware----------------------------------------------------->
const verify = (req, res, next) => {
  // send Token in req Headers
  const authnHeader = req.headers.authorization;
  if (authnHeader) {
    const token = authnHeader.split(" ")[1];
    jwt.verify(token, "mySecretKey", (err, user) => {
      if (err) {
        return res.status(401).json("Token is not valid");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You are not authorized to access this");
  }
};

//<--------------------------------------------------------------------Login-------------------------------------------->
router.post("/logout", verify, (req, res) => {
  const refreshToken = req.body.token;
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.status(200).json("You logged out successfully");
});
//<---------------------------------------------------------------------register-------------------------------------------->
router.post("/register",async (req, res) => {
  // ชื่อ นามสกุล อีเมล และ พาสเวริด จะส่งผ่านยัง req.body
  const { firstName, lastName, email, password } = req.body;
  console.log({
    "userRegister": "detail",
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  })
  const [rows, fields] = await pool.query(
    "SELECT Customer_email from Customer"
  )
  console.log(rows)
  const emailExits = rows.find(row => row.Customer_email === email)
  if(emailExits === undefined) {
    const [rows, field] = await pool.query("INSERT INTO customer(Customer_email, Customer_Fname, Customer_Lname, Customer_Password) VALUES (?, ?, ?,?)",
    [email, firstName, lastName, password])
    res.status(200).json("success")
  }
  else{
    res.status(400).json("can't register email is already exists")
  }
});

router.get("/itfoodhub", verify, async (req, res) => {
  console.log("try to connect to Home page");
  // req.user ที่ได้จะเป็นข้อมูลที่เราเอา token ไป decode แล้ว เราจะเอาข้อมูลนั้นมา query เผื่อ แสดงผล
  var Customer_email = req.user.Customer_email;
  const [users, field] = await pool.query(
    "SELECT *  FROM customer  where Customer_Email = ?",
    Customer_email
  );
  const [resturants, field_res] = await pool.query("SELECT * FROM restaurants");
  res.send({ users: users, restuarants: resturants });
});

router.get("/itfoodhub/:Restaurant_name", async (req, res) => {
  const Restaurant_name = req.params.Restaurant_name;
  const [restaurant, fields] = await pool.query(
    "SELECT *  FROM restaurants where Restaurant_name = ?;",
    Restaurant_name
  );
  res.send(restaurant[0]);
})

// หน้าที่โชว์ order ทั้งหมด
router.get("/orders", verify , async (req, res)=>{
  let userIsOnduty = false
  const Delivery_email= req.user.Customer_email
  //check order ที่มี delivery คนเดียวกับคนที่ขอ requset
  const [rows, field] = await pool.query(
    "select o.order_id , o.order_total_price, o.order_destination, o.restaurant_name, d.customer_Fname as 'delivery_name', c.customer_Fname as 'customer_name', f.food_name from orders o left outer join customer d on (o.delivery_id = d.customerId) left outer join customer c on (o.customer_id = c.customerId) left outer join foodorder f on (f.order_id = o.order_id)  where d.customer_email = ?",
    [Delivery_email]
    )
  console.log(rows)
  //check ว่า user คนนั้นรับ order ไปหรือยัง
  if(rows.length == 0){
    console.log("is not onDuty")
    const [order_Delivery, fields] = await pool.query(
      "select o.order_id,  o.order_total_price, o.order_destination, o.restaurant_name, f.food_name from orders o left outer join foodorder f on o.order_id = f.order_id where o.delivery_id is null")
       res.send(order_Delivery)
  }else{
    console.log("already onDuty")
    res.send(rows)
  }
  

})

// รับ order

router.post("/recieveorders/:id", verify , async (req, res)=>{

    const Delivery_email= req.user.Customer_email
    const idOrder = req.params.id
    //เอาชื่อของ Delivery
    try{
    const [delivery_details, fields] = await pool.query("select * from customer where customer_email = ?;",
    Delivery_email)
    // update order ให้มีคน delive
    const Delivery_ID = delivery_details[0].CustomerId
    const [update, field] = await pool.query(
      "update orders set delivery_id = ? where orders_id = ?;", [Delivery_ID, idOrder]
    )
      console.log("success")
    }catch(err){
      console.log(err)
    }
    res.send("success")
})

// นี้คือ การ update status ของ order 

module.exports = router;
