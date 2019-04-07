import React from "react";
import { createMaterialTopTabNavigator, createAppContainer } from "react-navigation";
import Decks from "./decks";
import AddDeck from "./addDeck";
import { Feather } from "@expo/vector-icons";
import { appTheme } from "../Utils/helper";
const { tabIconColor, lineColor, themeBgColor } = appTheme

const TabNavigator = createMaterialTopTabNavigator({
    Decks: {
        screen: Decks,
        navigationOptions: {
            tabBarIcon: _ => <Feather name="home" color={tabIconColor} />
        }
    },
    Add: {
        screen: AddDeck,
        navigationOptions: {
            tabBarIcon: _ => <Feather name="plus" color={tabIconColor} />
        }
    }
}, {
        initialRouteName: 'Decks',
        tabBarPosition: 'bottom',
        tabBarOptions: {
            showIcon: true,
            labelStyle: {
                color: 14,
                color: '#fff'
            },
            style: {
                backgroundColor: themeBgColor
            },
            indicatorStyle: {
                backgroundColor: lineColor
            }
        }
    });

export default createAppContainer(TabNavigator);