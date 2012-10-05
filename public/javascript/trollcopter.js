var socket = io.connect(location.host);

$(document).ready(function(){
	 socket.on('connected', function (data) {
	   	window.location.href='#connected';
	   	window.location.href='#';
	  });

});

function makeFlight(){
	socket.emit('makeFlight');
}
