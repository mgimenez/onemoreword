import React, { Component } from 'react';
import './global.scss';
import './animate.scss';
import Header from './components/Header/Header';
import FormWord from './components/FormWord/FormWord';
import Sentence from './components/Sentence/Sentence';

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3030');

class App extends Component {

  constructor() {
    super();

    this.state = {
      sentence: '',
      word: '',
      errorWord: false
    }
  }

  componentDidMount() {
    socket.on('msgFromServer', (msg) => {
      console.log(msg);

      this.setState({
        sentence: msg
      });

    });
  }
  

  sendWord() {
    // e.preventDefault();

    // if (this.validate(word)) {
      socket.emit('msgFromClient', this.state.word);
      // socket.on('msgFromServer', function(msg) {
        //     console.log(msg);
        // });
        // }
      this.setState({
        sentence: this.state.word
      });
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
    return (
      <div className="app-wrapper">
        <Header />
        <Sentence state={this.props.state} sentence={this.state.sentence} />
        <FormWord state={this.props.state} sentence={this.state.sentence} addWord={this.addWord} word={this.state.word} errorWord={this.state.errorWord} />
      </div>
    )
  }

}

export default App;