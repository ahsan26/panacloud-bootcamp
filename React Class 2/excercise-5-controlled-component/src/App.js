import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txt: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Bootcamp - Train the Trainer - Coding Excercise</h1>
        </header>
        <div className="container">
          <input type="text"
            name="txt"
            value={this.state.txt}
            onChange={this.handleChange}
            placeholder="Write your text here"
          />
          <p className="echo">You are saying:</p>
          <p>
            {
              this.state.txt
            }
          </p>
        </div>
      </div>
    );
  }
}

export default App;

