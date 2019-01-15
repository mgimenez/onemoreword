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
        const { store } = this.props;
        setTimeout(() => {
            store.hide();
        }, 3000);
    }


    render() {
        const { store } = this.props;
        return (
            <div className="app-sentence">
                { store.show ? store.sentence : '' }
            </div>
        )
    }
}


export default observer(Sentence);