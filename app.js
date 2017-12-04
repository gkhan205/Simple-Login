const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const options = {
    useMongoClient: true,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
};
mongoose.connect('mongodb://localhost:27017/react-game', options, function (err, conn) {
    if (err) {
        console.log('DB Not Connected ' + err);
    } else {
        console.log('DB Connected');
    }
});

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Set Headers (It should be above the API Routes call)
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});

// Import Models
const user = require('./model/users');

// Import Routes
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');

// Register Routes
app.use('/register', registerRoute);
app.use('/login', loginRoute);

app.get('*', function (req, res) {
    res.send('It worked!');
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log('Server started at localhost:' + port);
});