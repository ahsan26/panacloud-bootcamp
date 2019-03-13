import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import BooksPortal from './components/booksContainer';
import Search from './components/search';

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={BooksPortal} />
                    <Route path="/search" component={Search} />
                    <Route render={_ => <h3>404 Not Found</h3>} />
                </Switch>
            </BrowserRouter>

        );
    }
}

export default App
