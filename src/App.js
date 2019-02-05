import React, { Component } from 'react';
import TodoContainer from "./Components/TodoContainer";

class App extends Component {
  render() {
    console.log(this.props)
    return (
      <TodoContainer />
    );
  }
}



export default App;
