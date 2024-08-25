require('dotenv').config()
const express = require('express');
const connectDB = require('./vsupport-backend/config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);



// Connect Database
connectDB();

// Init Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(cookieParser()); // Added cookie parser middleware

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'/Views/index.html'));
});

app.get('/:page', (req, res) => {
    const page = req.params.page;
    const validPages = [
        'after_login.html', 'solutions.html',
        'contribute.html', 'community.html', 'About_us.html',
        'Privacy.html', 'Terms_services.html', 'Contact_us.html',
        'sign_in.html', 'sign_up.html', 'database_issue.html','admin.html','dashboard.html'
    ];

    if (validPages.includes(page)) {
        res.sendFile(path.join(__dirname, `./Views/${page}`));
    } else {
        res.status(404).send('Page not found');
    }
});


// Define API Routes
app.use('/api', require('./vsupport-backend/routes/solution'));
app.use('/api/contributions', require('./vsupport-backend/routes/contributions'));
app.use('/api/newsletter', require('./vsupport-backend/routes/newsletter'));
app.use('/api/contact', require('./vsupport-backend/routes/contact'));
app.use('/api/auth', require('./vsupport-backend/routes/Auth'));
app.use('/api/admin', require('./vsupport-backend/routes/admin'));
app.use('/api/stats', require('./vsupport-backend/routes/stats'));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Socket.io connection
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});
