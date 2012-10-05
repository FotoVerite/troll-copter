//Modules whoop whoop
var arDrone = require('ar-drone');
var droneClient  = arDrone.createClient();
var express = require('express');
var exec = require('child_process').exec;
var app = module.exports = express.createServer();

var io = require('socket.io').listen(app);

  // Configuration
  app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
  });
  
app.configure('development', function(){
   app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
 });
 
 app.configure('production', function(){
   app.use(express.errorHandler());
 });
 
 app.get('/', function(req, res){
   res.render('index', { title: 'TrollCopter', host : req.query.host });
 });
 
 app.listen(3000, function(){
   console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
 
 });
 
 io.sockets.on('connection', function (socket) {
 	
  socket.emit("connected");
 
   socket.on('makeFlight', function () {
		console.log("flying");
 		droneClient.takeoff(); 	
   });
   
   socket.on('doFlip', function () {
	   console.log("doing backflip");
	   droneClient.animate('flipBehind', 15);
	   socket.emit("doneFlip");
	 });
 });
