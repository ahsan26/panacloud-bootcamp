import React, { Component, Fragment } from 'react';
import * as AsyncAPI from "../Utils/asyncApi";
import Statusbar from "./statusBar";
import StackNavigator from "./stackNavigator";

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            decks: {}
        };
        this.handleNewDeckSubmission = this.handleNewDeckSubmission.bind(this);
        this.handleNewQuestionSubmission = this.handleNewQuestionSubmission.bind(this);
        this.handleRemovingDeck = this.handleRemovingDeck.bind(this);
        this.initialData = this.initialData.bind(this);
    }
    handleNewDeckSubmission(title) {
        return AsyncAPI.createNewDeck(title).then(newDeck => {
            let decks = this.state.decks;
            decks[title] = newDeck;
            this.setState({ decks });
            return newDeck;
        });
    }

    handleNewQuestionSubmission(title, card) {
        return AsyncAPI.addCardToDeck(title, card).then(newDeck => {
            let decks = this.state.decks;
            decks[title] = newDeck;
            this.setState({ decks });
            return newDeck;
        });
    }

    handleRemovingDeck(title) {
        return AsyncAPI.removeDeck(title).then(decks => {
            this.setState({ decks });
        });
    }

    initialData() {
        AsyncAPI.loadInitialData().then(decks => {
            this.setState({ decks });
        })
    }

    componentDidMount() {
        this.initialData();
        AsyncAPI.initiateLocalNotification();
    }

    render() {
        return (
            <Fragment>
                <Statusbar barStyle='light-content' />
                <StackNavigator
                    screenProps={{
                        decks: this.state.decks,
                        handleNewDeckSubmission: this.handleNewDeckSubmission,
                        handleNewQuestionSubmission: this.handleNewQuestionSubmission,
                        handleRemovingDeck: this.handleRemovingDeck
                    }}
                    ref={nav => { this.navigation = nav }}
                />
            </Fragment>
        );
    }
}

export default Dashboard;