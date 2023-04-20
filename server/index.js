const express = require("express");
const cors = require("cors");
const io = require("./socket/index")
// function to update order status
const updateOrderStatus = require("./socket/updateorderstatus")

const app = express();
const port = 5000;
// use socket.io
updateOrderStatus(io)


app.use(cors());
app.use(express.json());

app.use("/api", require("./routes/users"));
app.use("/api", require("./routes/delivery person"));
app.use("/api", require("./routes/resturant"))

app.listen(port, () => {
  console.log("Server running on port 5000");
});