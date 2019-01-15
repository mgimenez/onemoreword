import { types } from 'mobx-state-tree';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3030');


const SentenceStore = types
    .model('Sentence', {
        sentence: types.string,
        word: types.string,
        users: types.array(types.string),
        username: types.optional(types.string, ''),
        userCount: types.optional(types.integer, 0),
        show: false,
        error: false
    })
    .actions(self => ({
        validateUser(username) {
            socket.emit('validateUser', username);
        },
        validateSentence(sentence) {
            socket.emit('validateSentence', sentence);
        },
        addWord(sentence) {
            self.show = true;
            self.sentence = sentence;
        },

        addUser(data) {
            socket.emit('addUser', data.username);
            self.username = data.username;
        },
        socketListeners() {
            socket.on('login', data => {
                self.updateUsers(data);
            });

            socket.on('userJoined', (data) => {
                self.updateUsers(data);
            });

            socket.on('userLeft', (data) => {
                self.updateUsers(data);
            });

            socket.on('loginSuccess', data => {
                self.addUser(data);
            });
            
            socket.on('addWord', sentence => {
                self.addWord(sentence);
            });
            socket.on('gameOver', () => {
                alert('game over');
            });
        },
        updateUsers(data) {
            let usersList = data.userList.filter(u => u != self.username);
            self.users = usersList;
            self.userCount = data.userCount;
        },
        removeUser(username) {
            let index = self.users.indexOf(username);
            let users = self.users.splice(index, 1);
            self.updateUsers(users);
        },
        hide() {
            self.show = false;
        }
    }))

export default SentenceStore;