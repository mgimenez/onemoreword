import './Header.scss';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';

class Header extends Component {

    render() {

        return (
            <header>
                <h1>OneMoreWord!</h1>
                <p>Socket.io in React</p>
            </header>
        )
    }
}


export default observer(Header);