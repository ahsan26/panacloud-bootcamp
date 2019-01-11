import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ChatContainer from "./Containers/chatContainer";

const users = [{ username: 'ahsan' }, { username: 'Aamir_Pinger' }];

const messages = [
  { username: 'ahsan', text: 'Hi, Aamir!' },
  { username: 'ahsan', text: 'How are you?' },
  { username: 'Aamir_Pinger', text: 'Hello, {ahsan}! Good n you?' },
];

class App extends Component {
  /*
  If the user did not type anything, he/she should not be
  allowed to submit.
  */
  isDisabled() {
    return false;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Bootcamp - Train the Trainer - Coding Excercise</h1>
        </header>
        <ChatContainer
          isDisabled={this.isDisabled.bind(this)}
          users={users}
          messages={messages}
        />
      </div>
    );
  }
}

export default App;


