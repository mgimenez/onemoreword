import { observer } from 'mobx-react';
import './FormLogin.scss';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class FormLogin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: ''
        }
    }

    render() {
        const { userStore } = this.props;
        return (
            <div>
                {
                    !userStore.loggedIn ?
                    <div>
                        <h4>Login</h4>
                        <form className={"app-form-login"} 
                            onSubmit={e => {
                                e.preventDefault();
                                if (this.state.username !== '') userStore.validateUser(this.state.username);
                            }}>

                            <input className="app-form-login__input" type="text" ref="inputUsername" onChange={e => this.setState({ username: e.target.value })} />
                            <input className="app-form-login__submit" value="Send" type="submit" />
                            { userStore.loginError && <p className="error-msg">{userStore.errorMessage}</p> }
                        </form>
                    </div>

                    :
                    
                    <h4>Login as {userStore.username}</h4>
                }

                

            </div>
        )
    }
}

export default observer(FormLogin);