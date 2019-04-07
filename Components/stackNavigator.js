import React from "react";
import { createStackNavigator ,createAppContainer} from "react-navigation";
import TabNavigator from "./tabNavigator";
import Deck from "./deck";
import AddCard from "./addCard";
import Quiz from "./quiz";

const StackNavigator = createStackNavigator({
    Main: {
        screen: TabNavigator,
        navigationOptions: {
            header: null
        }
    },
    Deck: {
        screen: Deck,
        navigationOptions: ({ navigation }) => ({
            title: navigation.state.params.deck.title
        })
    },
    AddCard: {
        screen: AddCard,
        navigationOptions: {
            title: 'Add Card'
        }
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: {
            title: 'Quiz'
        }
    }
}, { initialRouteName: "Main" });

export default createAppContainer(StackNavigator);