
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3030');
import './UserList.scss';

import { observer } from 'mobx-react';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class UserList extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        const { userStore } = this.props;

        return (
            <div>
                <span>Users: ({userStore.userCount})</span>
                <ul className="app-user-list">
                    {
                        userStore.users.map(function (item, i) {
                            return (
                                <React.Fragment key={i}>
                                    {
                                        item !== '' && 
                                        <li className={i === 0 ? 'current-user' : ''} >
                                            {item} 

                                            { i === 0 && <span>(You)</span>}
                                        </li>
                                    }
                                </React.Fragment>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default observer(UserList);