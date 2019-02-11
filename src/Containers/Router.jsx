import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LogIn from "../Components/login";
import DashBoard from "../Components/dashboard";
import AuthCheck from "../HOC/authCheck";

export default class extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={AuthCheck(DashBoard)} />
                    <Route path="/login" component={LogIn} />
                    <Route render={_ => <h1>404 Not Found</h1>} />
                </Switch>
            </BrowserRouter>
        );
    }
}