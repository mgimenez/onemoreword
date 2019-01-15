const express = require('express');
const app = express();
const http = require('http').Server(app);
const os = require('os');
const io = require('socket.io')();
var str = [];
var userList = [];
var userCount = 0;

app.use(express.static('dist'));

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

io.on('connection', (socket) => {
    
    var addedUser = false;

    // console.log('a user connected');

    socket.on('addUser', (username) => {

        if (!addedUser)++userCount;
        socket.username = username;
        socket.userList = userList.push(username);
        addedUser = true;
        socket.emit('login', {
            userCount: userCount,
            username: username,
            userList: userList
        });

        socket.broadcast.emit('userJoined', {
            userCount: userCount,
            username: username,
            userList: userList
        });
    });

    socket.on('validateUser', (username) => {
        let loginError = false;

        for (i = 0; i < userList.length; i++) {
            if (username === userList[i]) {
                loginError = true;
                // if (username === usernamePrev) {
                //     socket.emit('UserExistent', {
                //         username: username
                //     });
                // } else {
                //     socket.emit('loginError', {
                //         username: username
                //     });
                // }
            }
        }

        if (!loginError) {
            socket.emit('loginSuccess', {
                username: username
            });
        } else {
            socket.emit('loginError', {
                username: username
            });
        }

    });

    socket.on('disconnect', function () {

        if (addedUser) {
            --userCount;

            var i = 0,
                total = userList.length;
            for (i; i < total; i++) {
                if (userList[i] === socket.username) {
                    userList.splice(i, 1);
                }
            }

            // echo globally that this client has left
            socket.broadcast.emit('userLeft', {
                username: socket.username,
                userCount: userCount,
                userList: userList
            });
        }
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