const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");

const userRoute = require("./routes/user");
const chatRoute = require("./routes/chat");
const authRoute = require("./routes/auth");

dotenv.config();
//CONNECT DATABASE
mongoose.connect((process.env.MONGODB_URL), () => {
    console.log("Connect to MongoDB");
})


app.use(bodyParser.json({limit:"50mb"}));
app.use(cors());
app.use(morgan("common"));

//ROUTERS
app.use("/api/user", userRoute);
app.use("/api/chat", chatRoute);
app.use("/", authRoute);

app.listen(8000, () =>{
    console.log("server is running...");
})

//JSON WEB TOKEN
