//This is an express app

var http=require('http');
var express= require('express');
//const socketio=require('socket.io');
var socketIO = require('socket.io');
const mongoose = require('mongoose');
var appController=require('./controllers/appController'); //the modules from tdoController.js are in todoController now.

var socketIO = require('socket.io');

var app=express();//inheriting the methods of express onto app.

app.use(express.static(__dirname + '/public'));

 
app.set('view engine','ejs'); //telling the app that the view engine templates are in ejs format.

// app.use(express.static('./public')); //middleware to handle routing of staic files




appController(app); //in todoController.js, it is a function that takes an argument.
const PORT=5000||process.env.PORT;
// app.listen(PORT);//listening on port 5000 for rquests
console.log("listening on port 5000 for requests");

var io=socketIO.listen(app.listen(PORT));

io.on('connection', (socket) => {
  console.log('client connected');
  socket.on('message',(msg)=>{
      io.sockets.emit('message',msg);
  })

});

