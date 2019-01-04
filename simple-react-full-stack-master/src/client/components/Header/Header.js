import './Header.scss';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

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


export default Header;