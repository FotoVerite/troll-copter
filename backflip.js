//Modules whoop whoop
var arDrone = require('ar-drone');
var droneClient  = arDrone.createClient();

droneClient.takeoff();

droneClient.after(5000, function() {
	console.log("going up");
	this.up(1);
  })
  .after(5000, function() {
  	console.log("Do a backflip");
  	//if power is < 30%, it won't flip
  	this.animate('flipBehind', 15);
	})
  .after(3000, function() {
	console.log("going down");
	this.stop();
	this.land();
  });