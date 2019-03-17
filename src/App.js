import React, { Component } from 'react';
import NavBar from "./Components/navBar";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LogIn from './Components/LogIn';
import Dashboard from './Components/dashboard';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <NavBar />
        <Switch>
          <Route path="/" exact component={LogIn} />
          <Route path="/dashboard" component={Dashboard} />
          <Route render={_ => <h1>404 Not Found</h1>} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
