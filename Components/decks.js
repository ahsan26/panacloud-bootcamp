import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native"
import { withNavigation } from "react-navigation";
import { isNoDeck, randomColorGroup } from "../Utils/helper";
import { LinearGradient } from "expo";

const EachDeck = ({ navigation, deck }) => {
    return (
        <LinearGradient start={[.1,.2]} end={[.9,.5]} colors={randomColorGroup()} style={styles.deckContainer}>
            <TouchableOpacity onPress={_ => navigation.navigate('Deck', { deck })}>
                <Text style={styles.heading}>{deck.title}</Text>
                <Text style={styles.questionsLengthShower}>{deck.questions.length} Cards</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
}

const Decks = ({ screenProps, navigation }) => {
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
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8
    },
    heading: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },
    questionsLengthShower: {
        color: '#fff'
    }
})

export default withNavigation(Decks);