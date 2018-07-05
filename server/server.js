var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var db = require('./db');
var path = require('path');
var userRouter = require('./resources/User/userRouter');
var profileRouter = require('./resources/UserProfile/ProfileRouter');
var commentsRouter = require('./resources/Comments/CommentsRouter');
var ItemRouter = require('./resources/Items/ItemRouter');
var PostRouter=require('./resources/Posts/PostRouter');
var messagesRouter=require('./resources/Messages/messagesRouter');
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');
var app = express();

app.use(session({
  secret: 'OurAppSessionSecrets',
  resave: false,
  saveUninitialized: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/../react-client/dist'));
app.use('/',userRouter);
app.use('/user',profileRouter);
app.use('/item', ItemRouter);
app.use('/post',PostRouter);
app.use('/comments', commentsRouter);
app.use('/messages', messagesRouter);

app.get('*', function (req, res){
    res.sendFile(path.resolve(__dirname, '../react-client/dist', 'index.html'));
})

module.exports = app;
