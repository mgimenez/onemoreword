import './Sentence.scss';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Sentence extends Component {

    constructor(props) {
        super(props);

        // this.state = {
        //     sentence: this.props.sentence
        // }
    }


    render() {
        return (
            <div className="app-sentence">
                {this.props.sentence}
            </div>
        )
    }
}


export default Sentence;