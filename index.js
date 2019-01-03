var http = require('http');
var express = require("express");
var app = express();
var path = require("path");
app.use('/assets',express.static('assets'));
app.use('/test',express.static('test'));
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/login.html'));
});
app.get('/chat',function(req,res){
  res.sendFile(path.join(__dirname+'/chat.html'));
});
app.get('/test',function(req,res){
  res.sendFile(path.join(__dirname+'/test/testexecutionfile_phantom.html'));
});
app.listen(3000);
console.log("Server running at Port 3000");