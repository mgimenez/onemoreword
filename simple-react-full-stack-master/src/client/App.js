import React, { Component } from 'react';
import './global.scss';
import './animate.scss';
import Header from './components/Header/Header';
import FormWord from './components/FormWord/FormWord';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3000');

class App extends Component {

  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: 'http://localhost:3000'
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = openSocket(endpoint);
    socket.on('chat message', (msg) => {
      console.log(msg);
    });
  }

  render() {
    return (
      <div className="app-wrapper">
        <Header />
        <FormWord />
      </div>
    )
  }

}

export default App;