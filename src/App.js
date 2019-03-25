import React, { Component } from "react";
import NavBar from "./Components/navBar";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LogIn from "./Components/LogIn";
import Dashboard from "./Components/dashboard";
import { connect } from "react-redux";
import { _getUsers } from "./_DATA";
import { setUsers } from "./Store/Actions/auth";
import PrivateComponent from "./Components/PrivateComponent";
import NewQuestion from "./Components/newQuestion";
import LeaderBoard from "./Components/leaderBoard";
import ViewPoll from "./Components/viewPoll";

class App extends Component {
  componentDidMount() {
    _getUsers().then(users => {
      this.props.setUsers(users);
    });
  }
  render() {
    return (
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path="/" exact component={LogIn} />
          <Route path="/dashboard" component={PrivateComponent(Dashboard)} />
          <Route
            path="/newQuestion"
            component={PrivateComponent(NewQuestion)}
          />
          <Route
            path="/leaderBoard"
            component={PrivateComponent(LeaderBoard)}
          />
          <Route path="/viewPoll:qId" component={PrivateComponent(ViewPoll)} />
          <Route render={_ => <h1>404 Not Found</h1>} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default connect(
  state => ({ auth: state.auth }),
  { setUsers }
)(App);
