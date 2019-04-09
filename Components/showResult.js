import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { appTheme } from "../Utils/helper"
import { markDateAsQuizAttempted } from "../Utils/asyncApi"

const ShowResult = ({ navigation, restartQuiz, correctCount, totalQuestions }) => {
    markDateAsQuizAttempted();
    return (
        <View style={styles.root}>
            <Text style={styles.header}>Quiz Result {((correctCount / totalQuestions) * 100).toFixed(2)}</Text>
            <Text style={styles.info}>Total {correctCount} question(s) answered correctly out of total {totalQuestions} question(s)</Text>
            <View style={styles.actionTakingContainer}>
                <TouchableOpacity style={styles.button} onPress={restartQuiz}>
                    <Text style={styles.buttonText}>Restart Quiz</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={_ => navigation.goBack()}>
                    <Text style={styles.buttonText}>GoTo Deck</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center'
    },
    header: {
        fontSize: 24,
        textAlign: 'center',
        marginTop: 50
    },
    info: {
        marginTop: 20,
        fontSize: 16,
        textAlign: 'center'
    },
    button: {
        backgroundColor: appTheme.themeBgColor,
        width: 100,
        height: 30,
        borderRadius: 5,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12
    },
    buttonText: {
        color: appTheme.tabIconColor
    },
    actionTakingContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 125
    }
});

export default ShowResult