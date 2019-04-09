import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { appTheme } from "../Utils/helper"

class Deck extends React.Component {
    deleteDeck = () => {
        const title = this.props.navigation.state.params.deck.title;
        this.props.screenProps.handleRemovingDeck(title).then(_ => {
            this.props.navigation.navigate('Decks');
        })
    }
    render() {
        const title = this.props.navigation.state.params.deck.title;
        const cardsLength = this.props.navigation.state.params.deck.questions.length;
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.cardsLength}>{cardsLength} Cards</Text>
                <TouchableOpacity style={[styles.btn, { backgroundColor: appTheme.themeBgColor }]} onPress={_ => this.props.navigation.navigate('AddCard', { title })}>
                    <Text style={[styles.btnText, { color: appTheme.lineColor }]}>Add Card</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.btn, { backgroundColor: appTheme.themeBgColor }]} onPress={_=>this.props.navigation.navigate("Quiz",{deck:this.props.navigation.state.params.deck})}>
                    <Text style={[styles.btnText, { color: appTheme.lineColor }]}>Start Quiz</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.btn, { backgroundColor: 'red', borderColor: 'red' }]} onPress={this.deleteDeck}>
                    <Text style={[styles.btnText, { color: '#fff' }]}>Delete Deck</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 10,
        fontSize: 25,
        borderBottomWidth: 2,
        borderBottomColor: appTheme.lineColor,
    },
    btn: {
        width: 125,
        marginBottom: 25,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#000',
        justifyContent: 'center',
        height: 35
    },
    btnText: {
        textAlign: 'center'
    },
    cardsLength: {
        color: 'gray',
        fontSize: 15,
        marginBottom: 100
    }
});

export default Deck;