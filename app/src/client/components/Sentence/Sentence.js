import './Sentence.scss';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';


class Sentence extends Component {
    
    constructor(props) {
        super(props);
        
        // this.state = {
            
        //     show: this.props.state.show
        // }
    }

    componentDidUpdate() {
        const { state } = this.props;
        setTimeout(() => {
            state.hide();
        }, 3000);
    }


    render() {
        const { state } = this.props;
        return (
            <div className="app-sentence">
                { state.show ? state.sentence : '' }
            </div>
        )
    }
}


export default observer(Sentence);