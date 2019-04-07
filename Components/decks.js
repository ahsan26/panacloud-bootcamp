import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native"
import { withNavigation } from "react-navigation";
import { isNoDeck } from "../Utils/helper";

const EachDeck = ({ navigation ,deck}) => {
    return (
        <TouchableOpacity style={styles.deckContainer} onPress={_=>navigation.navigate('Deck',{deck})}>
            <Text style={styles.heading}>{deck.title}</Text>
            <Text style={styles.questionsLengthShower}>{deck.questionsLength} Cards</Text>
        </TouchableOpacity>
    );
}

const Decks = ({ screenProps ,navigation}) => {
    const { decks } = screenProps;
    return (
        <View style={styles.mainContaienr}>
            <ScrollView>
                {
                    isNoDeck(decks) ? <Text>No Decks To Display!</Text> :
                        Object.values(decks).map(deck => <EachDeck key={deck.title} navigation={navigation} deck={deck} />)
                }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContaienr: {
        paddingLeft: 5,
        paddingRight: 5
    },
    deckContainer: {
        width: '100%',
        height: 200,
        borderRadius: 5,
        borderColor: 'black',
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8
    }
})

export default withNavigation(Decks);