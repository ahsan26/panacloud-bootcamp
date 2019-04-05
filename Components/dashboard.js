import React ,{Component,Fragment}from 'react';
import { View, Text } from "react-native";
import * as AsyncAPI from "../Utils/asyncApi";
import Statusbar from "./statusBar";

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
            this.setState(prevState => ({
                ...prevState.decks,
                [title]: newDeck
            }));
            return newDeck;
        });
    }

    handleNewQuestionSubmission(title, card) {
        return AsyncAPI.addCardToDeck(title, card).then(newDeck => {
            this.setState(prevState => ({
                ...prevState.decks,
                [title]: newDeck
            }));
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
    }

    render() {
        return (
            <Fragment>
<Statusbar barStyle='light-content' />
            </Fragment>
        );
    }
}

export default Dashboard;