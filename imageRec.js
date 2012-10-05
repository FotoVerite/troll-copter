/* 
 * dron png strem to 
 */

var arDrone = require('../node-ar-drone');
var cv = require('../node-opencv/lib/opencv');
var fs = require('fs');

var client = arDrone.createClient();
client.config('videoEnabled', 1);
var pngStream = arDrone.createPngStream();


var GREEN = [0, 255, 0];
var RED = [255, 0, 0];
var BLUE = [255, 0, 0];

var dirPath = './tmp/'+Date.now();
fs.mkdir(dirPath,0777);

var i = 0;

console.log('start');

function addObjectsToImage(obejcts, image, frameType, color){
    var amount = obejcts.length;
    console.log('found ' + amount);
    for(var k = 0; k < amount; k++) {
        var o = obejcts[k];
        if('elipsys' === frameType){
            image.ellipse(o.x+o.width/2, o.y+o.height/2, o.width/2, o.height/2, color);
        } else {
            image.rectangle([o.x, o.y], [o.x + o.width, o.y + o.height], color, 2);
        }
    }
    if (0 < amount) image.save(dirPath + '/cam_' + i + '.png');
}

function parseIm(buffer) {
    
    var fd =  fs.openSync('./tmp/tmp.png', 'w');

    fs.write(fd, buffer, 0, buffer.length, 0, function(err,written){
        
        i++;
    
        cv.readImage('./tmp/tmp.png', function(err, im) {

            im.detectObject('../node-opencv/data/haarcascade_frontalface_alt2.xml', {}, function(err, faces) {
                addObjectsToImage(faces, im, 'rectangle', GREEN);
            });

        });
    
    });

}
    
var lastPng;
pngStream
    .on('error', console.log)
    .on('data', function(pngBuffer) {
        parseIm(pngBuffer);
    });