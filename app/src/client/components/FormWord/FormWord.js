import './FormWord.scss';
// import openSocket from 'socket.io-client';
// const socket = openSocket('http://localhost:3030');

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class FormWord extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form className={"app-form-word " + (this.props.errorWord ? 'animated shake': ' ' )} onSubmit={(e) => this.props.addWord(e, this.refs.inputWord)}>
                <input className="app-form-word__input" type="text" ref="inputWord" />
                <input className="app-form-word__submit" value="Send" type="submit" />
            </form>
        )
    }
}

export default FormWord;