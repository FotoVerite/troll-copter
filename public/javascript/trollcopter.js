var socket = io.connect(location.host);

$(document).ready(function(){
	 socket.on('connected', function (data) {
	   	window.location.href='#connected';
	   	window.location.href='#';
	  });
	  
	  socket.on('doneFlip', function (data) {
	    	window.location.href='#doneflip';
	    	window.location.href='#';
	   });

	  socket.on('isFlying', function (data) {
	  	window.location.href='#isFlying';
	  	window.location.href="#"
	  });

});

function takeOff(){
	socket.emit('takeOff');
}
function land(){
	socket.emit('land');
}

function doFlip(){
	socket.emit('doFlip');
}

function turn180(){
	socket.emit('turn180');
}

function doSideFlip(){
	socket.emit('doSideFlip');
}

function goForward(){
	socket.emit('goForward');
}