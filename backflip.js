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
 
// droneClient.on('navdata', console.log);
 
 io.sockets.on('connection', function (socket) {
 	
  socket.emit("connected");
 
   socket.on('takeOff', function () {
		console.log("Taking off.... flying!");
 		droneClient.takeoff(); 	
    socket.emit("isFlying");
   });

   socket.on('land', function (){
      console.log("Landing...");
      droneClient.land();
      socket.emit("hasLanded");
   });
   
   socket.on('doFlip', function () {
	   console.log("Doing a backflip...");
	   droneClient.animate('flipBehind', 15);
	   socket.emit("doneFlip");
	 });
	 
	 socket.on('doSideFlip', function () {
	    console.log("Doing a side flip...");
	    droneClient.animate('flipRight', 15);
	    socket.emit("doneFlip");
	  });
	  
	  socket.on('goForward', function () {
	     console.log("going forward");
	     droneClient.front(0.5);
	   });
	 
	 socket.on('turn180', function () {
	    console.log("turning 180");
	    droneClient.after(10, function(){ droneClient.animate('theta30Deg', 15); }).after(1000, function() {droneClient.animate('theta30Deg', 15);});
	  });
 });
