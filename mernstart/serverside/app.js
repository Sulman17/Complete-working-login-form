const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
const express = require('express');
 const dotenv = require('dotenv/config');
const app = express();
const PORT = process.env.PORT;
require('./database/server');
const User = require('./userdata/schema');
app.use(cookieParser());
app.use(express.json());
app.use(require('./routes/auth'));




// middleware
// const middleware = (req,res, next) =>{
//     console.log('hey');
//     next();
// };

// app.get('/', (req, res) => {
//     res.send('Hello World');
    
// });

// app.get('/about', (req, res) => {
//     res.send('about');
// });
app.get('/Contact', (req, res) => {
    res.send('contact');

});
app.get('/signin', (req, res) => {
    res.send('signin');

});
app.get('/signup', (req, res) => {
    res.send('signup');

});

app.listen(PORT);
