import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native"
import { withNavigation } from "react-navigation";
import { isNoDeck, randomColorGroup } from "../Utils/helper";
import { LinearGradient } from "expo";

const EachDeck = ({ navigation, deck }) => {
    return (
        <TouchableOpacity onPress={_ => navigation.navigate('Deck', { deck })} style={styles.deckContainer}>
            <LinearGradient start={[.1, .2]} end={[.9, .5]} colors={randomColorGroup()} style={styles.deckContainer}>
                <Text style={styles.heading}>{deck.title}</Text>
                {/* <Text style={styles.questionsLengthShower}>{deck.questions.length} Cards</Text> */}
            </LinearGradient>
        </TouchableOpacity>
    );
}

const Decks = ({ screenProps, navigation }) => {
    const { decks } = screenProps;
    return isNoDeck(Object.values(decks)) ? <View style={styles.noDecksIndicatorContainer}><Text style={styles.noDecksIndicator}>No Decks To Display!</Text></View> : (
        <View style={styles.mainContaienr}>
            <ScrollView>
                {
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
    noDecksIndicatorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noDecksIndicator: {
        textAlign: 'center',
        color: 'gray',
        fontSize: 18
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