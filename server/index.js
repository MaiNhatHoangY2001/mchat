const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/user");
const chatRoute = require("./routes/chat");
const authRoute = require("./routes/auth");
const chatHistoryRoute = require("./routes/chatHistory");
const individualChatRoute = require("./routes/individualChat");
const groupChatRoute = require("./routes/groupChat");
const messageRoute = require("./routes/message");

dotenv.config();
//CONNECT DATABASE
mongoose.connect((process.env.MONGODB_URL), () => {
    console.log("Connect to MongoDB");
})


app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan("common"));

//ROUTERS
app.use("/api/user", userRoute);
app.use("/api/chat", chatRoute);
app.use("/api", authRoute);
app.use("/api/chatHistory", chatHistoryRoute);
app.use("/api/individualChat", individualChatRoute);
app.use("/api/groupChat", groupChatRoute);
app.use("/api/message", messageRoute);

app.listen(8000, () =>{
    console.log("server is running...");
})

//JSON WEB TOKEN
