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

});

function makeFlight(){
	socket.emit('makeFlight');
}

function doFlip(){
	socket.emit('doFlip');
}
