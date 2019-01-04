import './FormWord.scss';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class FormWord extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: false
        }
    }

    sendWord(e, word) {
        e.preventDefault();
        if (this.validate(word)) {
            console.log(word);

            this.props.emitMsg()
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
            </form>
        )
    }
}

export default FormWord;