import './FormWord.scss';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3030');


import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class FormWord extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: false,
            sentence: this.props.sentence
        }
    }

    sendWord(e, word) {
        e.preventDefault();
        if (this.validate(word)) {
            socket.emit('msgFromClient', word);
            socket.on('msgFromServer', function(msg) {
                console.log(msg);
            });
        }
    }

    validate(word) {

        let isValid = word.split(' ').length === 1;

        this.setState({
            error: !isValid
        })

        setTimeout(() => {
            this.setState({
                error: false
            })
        }, 1000)

        return isValid;
    }

    render() {
        return (
            <form className={"app-form-word " + (this.state.error ? 'animated shake': ' ' )} onSubmit={(e) => this.sendWord(e, this.refs.inputWord.value)}>
                <input className="app-form-word__input" type="text" ref="inputWord" />
                <input className="app-form-word__submit" value="Send" type="submit" />
                {this.state.sentence}
            </form>
        )
    }
}

export default FormWord;