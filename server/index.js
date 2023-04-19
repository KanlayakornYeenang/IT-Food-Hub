const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/api", require("./routes/users"));
app.use("/api", require("./routes/delivery person"));

app.listen(port, () => {
  console.log("Server running on port 5000");
});