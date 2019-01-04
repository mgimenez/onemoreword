var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var str = [];

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    
    console.log('a user connected');

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on('chat message', function (msg) {
        let msgSplitted = msg.split(' '),
            lastWord = msgSplitted[msgSplitted.length - 1],
            msgWithoutLastWord = msgSplitted;
        msgWithoutLastWord.length = msgWithoutLastWord.length - 1;

        console.log(str, msgWithoutLastWord, arraysIdentical(str, msgWithoutLastWord));
        if (arraysIdentical(str, msgWithoutLastWord)) {
            str.push(lastWord);
            io.emit('chat message', msg);
        } else {
            io.emit('game over');
        }
    });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

function arraysIdentical(a, b) {
    var i = a.length;
    if (i != b.length) return false;
    while (i--) {
        if (a[i] !== b[i]) return false;
    }
    return true;
};