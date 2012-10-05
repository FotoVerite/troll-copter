// Emergency landing & reset script!

var arDrone = require('ar-drone');
var client  = arDrone.createClient();

client.stop();
client.land();
client.disableEmergency();