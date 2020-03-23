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
        const { sentenceStore } = this.props;
        setTimeout(() => {
            sentenceStore.hide();
        }, 3000);
    }


    render() {
        const { sentenceStore } = this.props;
        return (
            <div className="app-sentence">
                { sentenceStore.show ? sentenceStore.sentence : '' }
            </div>
        )
    }
}


export default observer(Sentence);