
import React from 'react';
import logo from './logo.svg';
import './App.css';
import List from "./Components/list";
import TodoForm from "./Components/todoForm";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      itemList: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.addNewItem = this.addNewItem.bind(this);
    this.removeLastItem = this.removeLastItem.bind(this);
    this.inputIsEmpty = this.inputIsEmpty.bind(this);
    this.noItemsFound = this.noItemsFound.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  };

  addNewItem(event) {
    event.preventDefault();
    this.setState(oldState => ({
      itemList: [...oldState.itemList, this.state.value],
    }));
  };

  removeLastItem() {
    this.setState(prevState => ({ itemList: prevState.itemList.slice(0, -1) }));
  };

  inputIsEmpty() {
    return this.state.value === '';
  };

  noItemsFound() {
    return this.state.itemList.length === 0;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Bootcamp - Train the Trainer - Coding Excercise</h1>
        </header>
        <h2>ToDo List</h2>
        <TodoForm
          value={this.state.value}
          addNewItem={this.addNewItem}
          handleChange={this.handleChange}
          inputIsEmpty={this.inputIsEmpty}
        />
        <button onClick={this.removeLastItem} disabled={this.noItemsFound()}>
          Delete Last Item
        </button>
        <p className="items">Item List</p>
        <List
          data={this.state.itemList}
        />
      </div>
    );
  }
}

export default App;


