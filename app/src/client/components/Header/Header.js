import './Header.scss';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';

class Header extends Component {

    render() {
        const { store } = this.props;

        return (
            <header>
                <h1>OneMoreWord!</h1>
                <p>Socket.io in React</p>
                {
                    store.username !== '' &&

                    <h4>Login as {store.username}</h4>
                }
            </header>
        )
    }
}


export default observer(Header);