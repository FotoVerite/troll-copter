/*
 * dron png strem to
 */

var arDrone = require('../node-ar-drone');
var cv = require('../node-opencv/lib/opencv');
var fs = require('fs');

var client = arDrone.createClient();
client.config('videoEnabled', 1);
var pngStream = arDrone.createPngStream();
var lastPng;

var GREEN = [0, 255, 0];
var RED = [255, 0, 0];
var BLUE = [255, 0, 0];
var i = 0;

var dirPath = './tmp/'+Date.now();
fs.mkdir(dirPath, 0777);

console.log('pngStram capture started');

function addObjectsToImage(obejcts, image, frameType, color){
    var amount = obejcts.length;
    if (0 < amount) {
        console.log('found ' + amount + ' face(s)');
        for(var k = 0; k < amount; k++) {
            var o = obejcts[k];
            if('elipsys' === frameType){
                image.ellipse(o.x+o.width/2, o.y+o.height/2, o.width/2, o.height/2, color);
            } else {
                image.rectangle([o.x, o.y], [o.x + o.width, o.y + o.height], color, 2);
            }
        }
        image.save(dirPath + '/cam_' + (i++) + '.png');
    }
}

function parseIm(buffer) {

    var fd =  fs.openSync('./tmp/tmp.png', 'w');

    fs.write(fd, buffer, 0, buffer.length, 0, function(err,written){
        try {
            cv.readImage('./tmp/tmp.png', function(err, im) {
                if(!err){
                    im.detectObject('../node-opencv/data/haarcascade_frontalface_alt_tree.xml', {}, function(err, faces) {
                        addObjectsToImage(faces, im, 'rectangle', GREEN);
                    });
//                    im.detectObject('../node-opencv/data/haarcascade_fullbody.xml', {}, function(err, faces) {
//                        addObjectsToImage(faces, im, 'elipsis', RED);
//                    });
                } else {
                    console.log(err);
                }
            });
        } catch(err) {
            console.log(err);
        }
    });
}

try {
    pngStream
        .on('error', console.log)
        .on('data', function(pngBuffer) {
            parseIm(pngBuffer);
        });
} catch(err) {
    console.log(err);
}
