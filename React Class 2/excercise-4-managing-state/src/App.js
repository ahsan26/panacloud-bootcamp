import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { getRandomNumWithMultiply } from "./Utils";
import Game from "./Components/game";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number1: 0,
      number2: 0,
      number3: 0,
      proposedAnswer: 0,
      numQuestions: 0,
      numCorrect: 0
    };
    this.setVales = this.setVales.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
  }
  setVales() {
    this.setState({
      number1: getRandomNumWithMultiply(100),
      number2: getRandomNumWithMultiply(100),
      number3: getRandomNumWithMultiply(100)
    }, _ => {
      const { number1, number2, number3 } = this.state;
      this.setState({
        proposedAnswer: getRandomNumWithMultiply(3) + number1 + number2 + number3
      })
    });
  }
  checkAnswer(usersAnswer) {
    const { number1, number2, number3, proposedAnswer } = this.state;
    const answer = (number1 + number2 + number3) === proposedAnswer;
    if (usersAnswer === answer) {
      this.setState(prevState => ({
        numQuestions: prevState.numQuestions+=1,
        numCorrect: prevState.numCorrect+=1
      }));
    }
    else {
      this.setState(prevState => ({
        numQuestions: prevState.numQuestions+=1
      }));
    }
    this.setVales();
  }
  componentDidMount() {
    this.setVales();
  }
  render() {
    const { number1, number2, number3, proposedAnswer, numCorrect, numQuestions } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Bootcamp - Train the Trainer - Coding Practice</h1>
        </header>
        <Game
          number1={number1}
          number2={number2}
          number3={number3}
          proposedAnswer={proposedAnswer}
          numCorrect={numCorrect}
          numQuestions={numQuestions}
          checkAnswer={this.checkAnswer}
        />
      </div>
    );
  }
}

export default App;

