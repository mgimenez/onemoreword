import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3030');

import SentenceStore from "./models/SentenceState";

const store = SentenceStore.create({
    sentence: '',
    word: ''
})
store.socketListeners();
ReactDOM.render(<App store={store} />, document.getElementById('root'));
