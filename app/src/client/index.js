import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import SentenceState from "./models/SentenceState";

const state = SentenceState.create({
    sentence: '',
    word: ''
})

ReactDOM.render(<App state={state} />, document.getElementById('root'));
