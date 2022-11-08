const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const socket = require('socket.io');

const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const individualChatRoute = require('./routes/individualChat');
const groupChatRoute = require('./routes/groupChat');
const messageRoute = require('./routes/message');
const uploadFileRoute = require('./routes/uploadFile');

const port = process.env.PORT || 8000;
const origin = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://mchat-realtimechat-cnm.netlify.app';

dotenv.config();
//CONNECT DATABASE
mongoose.connect(process.env.MONGODB_URL, () => {
	console.log('Connect to MongoDB');
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(
	cors({
		credentials: true,
		origin,
	})
);
app.use(morgan('common'));

//ROUTERS
app.use('/api/user', userRoute);
app.use('/api', authRoute);
app.use('/api/individualChat', individualChatRoute);
app.use('/api/groupChat', groupChatRoute);
app.use('/api/message', messageRoute);
app.use('/api/files', uploadFileRoute);

const server = app.listen(port, () => {
	console.log(`server is running... at ${port}`);
});

//io socket

const io = socket(server, {
	cors: {
		origin,
		credential: true,
	},
});

io.on('connection', (socket) => {
	socket.on('on-chat', (data) => {
		io.emit('user-chat', data);
	});
	socket.on('user', (data) => {
		io.emit('user-active', data);
	});
});
