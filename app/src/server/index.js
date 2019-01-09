const express = require('express');
const app = express();
const http = require('http').Server(app);
const os = require('os');
const io = require('socket.io')();
var str = [];

app.use(express.static('dist'));

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

io.on('connection', function (socket) {

    console.log('a user connected');

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on('msgFromClient', function(msg) {
        let msgSplitted = msg.split(' '),
            lastWord = msgSplitted[msgSplitted.length - 1],
            msgWithoutLastWord = msgSplitted;
        msgWithoutLastWord.length = msgWithoutLastWord.length - 1;

        console.log(str, msgWithoutLastWord, arraysIdentical(str, msgWithoutLastWord), msg);

        if (arraysIdentical(str, msgWithoutLastWord)) {
            str.push(lastWord);
            io.emit('msgFromServer', msg);
        } else {
            io.emit('game over');
        } 
    })
});

io.listen(3030);

app.listen(8080, () => console.log('Listening on port 8080!'));

function arraysIdentical(a, b) {
    var i = a.length;
    if (i != b.length) return false;
    while (i--) {
        if (a[i] !== b[i]) return false;
    }
    return true;
};