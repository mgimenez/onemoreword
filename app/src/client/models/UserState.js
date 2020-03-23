import { types } from 'mobx-state-tree';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3030');


const UserStore = types
    .model('User', {
        loginError: types.optional(types.boolean, false),
        loggedIn: false,
        errorMessage: types.optional(types.string, ''),
        users: types.array(types.string),
        username: types.optional(types.string, ''),
        userCount: types.optional(types.integer, 0),
    })
    .actions(self => ({
        validateUser(username) {
            socket.emit('validateUser', username);
        },
        addUser(data) {
            socket.emit('addUser', data.username);
            self.username = data.username;
            self.loginError = false;
            self.errorMessage = '';
            self.loggedIn = true;
        },

        showLoginError(data) {
            self.loginError = true;
            self.errorMessage = data.message;
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

            socket.on('loginError', data => {
                self.showLoginError(data);
            });

            socket.on('loginSuccess', data => {
                self.addUser(data);
            });
        },
        updateUsers(data) {
            let usersList = data.userList.filter(u => u != self.username);
            usersList.unshift(self.username);
            self.users = usersList;
            // console.log('updateUsers()', usersList, 'full list', self.users);
            self.userCount = data.userCount;
        },
        removeUser(username) {
            let index = self.users.indexOf(username);
            let users = self.users.splice(index, 1);

            let data = {
                userCount: self.userCount - 1,
                username: self.username,
                userList: users
            }
            console.log('username to remove', username, 'full list', self.users, 'updated list', users, data);
            self.updateUsers(data);
        },
    }))

export default UserStore;