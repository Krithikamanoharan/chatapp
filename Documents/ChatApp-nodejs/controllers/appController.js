var express=require("express");
var bodyParser=require('body-parser');
var urlencodedParser=bodyParser.urlencoded({ extended: false });

module.exports=function(app){

    app.get('/',function(req,res){
      res.render('home');
    });

   
    
    app.post('/create-user',urlencodedParser,function(req,res){
        console.log(req.body); //body parser gives access to body method of req object
        res.render('create-user',{data:req.body});
      });
      app.post('/index', urlencodedParser,(req, res) => {
        res.render('index',{data:req.body});
      });

//     app.get('/chat',function(req,res){
// res.render('chat');
//     });
    
  }
  