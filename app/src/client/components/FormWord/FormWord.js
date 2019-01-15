import './FormWord.scss';
// import openSocket from 'socket.io-client';
// const socket = openSocket('http://localhost:3030');

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { observer } from 'mobx-react';

class FormWord extends Component {

    constructor(props) {
        super(props);
    }

    validate() {
        
    }

    

    render() {
        const { state } = this.props;

        return (
            <form className={"app-form-word " + (this.props.errorWord ? 'animated shake': ' ' )} 
                onSubmit={e => {
                    e.preventDefault();
                    state.addWord(this.refs.inputWord.value);
                    this.refs.inputWord.value = ''
                }}>
                <input className="app-form-word__input" type="text" ref="inputWord" />
                <input className="app-form-word__submit" value="Send" type="submit" />
            </form>
        )
    }
}

export default observer(FormWord);