import './FormWord.scss';
// import openSocket from 'socket.io-client';
// const socket = openSocket('http://localhost:3030');

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { observer } from 'mobx-react';

class FormWord extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sentence: ''
        }
    }

    render() {
        const { sentenceStore } = this.props;

        return (    
            <form className={"app-form-word " + (this.props.errorWord ? 'animated shake' : ' ')}
                onSubmit={e => {
                    e.preventDefault();
                    sentenceStore.validateSentence(this.state.sentence);
                    this.setState({
                        sentence: ''
                    })
                }}>
                <input className="app-form-word__input" type="text" value={this.state.sentence} onChange={e => this.setState({ sentence: e.target.value })}  />
                <input className="app-form-word__submit" value="Send" type="submit" />
            </form>
        )
    }
}

export default observer(FormWord);