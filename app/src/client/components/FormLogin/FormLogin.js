
import { observer } from 'mobx-react';
import './FormLogin.scss';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class FormLogin extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { store } = this.props;
        return (
            <div>
                <h4>Login</h4>
                <form className={"app-form-login"} 
                    onSubmit={e => {
                        e.preventDefault();
                        store.validateUser(this.state.username);
                    }}>

                    <input className="app-form-login__input" type="text" ref="inputUsername" onChange={e => this.setState({ username: e.target.value })} />
                    <input className="app-form-login__submit" value="Send" type="submit" />
                </form>
            </div>
        )
    }
}

export default observer(FormLogin);