import React, { Component } from 'react';
import './global.scss';
import './animate.scss';
import Header from './components/Header/Header';
import FormLogin from './components/FormLogin/FormLogin';
import FormWord from './components/FormWord/FormWord';
import Sentence from './components/Sentence/Sentence';
import UserList from './components/UserList/UserList';

import { observer } from 'mobx-react';

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3030');

class App extends Component {

  constructor() {
    super();
  }


  validate(word) {

    let isValid = word.split(' ').length === 1;

    this.setState({
      error: !isValid
    })

    setTimeout(() => {
      this.setState({
        errorWord: false
      })
    }, 1000)

    return isValid;
  }

  render() {

    let { store } = this.props;

    return (
      <div className="app-wrapper">
        <Header store={store} />
        {
          store.username === '' ?
          <FormLogin store={store} />
          :
          <div>
            <UserList store={store} />
            <Sentence store={store} />
            <FormWord store={store} />
          </div>
        }
        
        
        
      </div>
    )
  }

}

export default observer(App);