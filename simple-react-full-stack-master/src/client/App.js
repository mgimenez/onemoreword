import React, { Component } from 'react';
import './global.scss';
import './animate.scss';
import Header from './components/Header/Header';
import FormWord from './components/FormWord/FormWord';

class App extends Component {

  constructor() {
    super();

    this.state = {
      sentence: 0
    }
  }

  render() {
    return (
      <div className="app-wrapper">
        <Header />
        <FormWord sentence={this.state.sentence} />
      </div>
    )
  }

}

export default App;