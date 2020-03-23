import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3030');

import SentenceStore from "./models/SentenceState";
import UserStore from "./models/UserState";

const store = {
    user: UserStore.create({
        loginError: false,
        loggedIn: false,
        errorMessage: '',
        users: [],
        username: '',
        userCount: 0,
    }),
    sentence: SentenceStore.create({
        sentence: '',
        word: '',
        show: false,
        error: false
    })
};
store.user.socketListeners();
store.sentence.socketListeners();
ReactDOM.render(<App userStore={store.user} sentenceStore={store.sentence} />, document.getElementById('root'));
