
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3030');
// import './FormLogin.scss';

import { observer } from 'mobx-react';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class UserList extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        const { store } = this.props;

        return (
            <div>
                <span>Users: ({store.userCount})</span>
                <ul className="app-user-list">
                    {
                        store.users.map(function (item, i) {
                            return <li key={i}>{item}</li>
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default observer(UserList);