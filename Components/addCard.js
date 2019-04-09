import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native"
import { appTheme } from "../Utils/helper";
import KeyBoardShift from "../Utils/keyboardShift";

class AddCard extends React.Component {
    constructor() {
        super();
        this.state = {
            answer: '',
            question: ''
        };
        this.handleAnswerChange = this.handleAnswerChange.bind(this);
        this.handleQuestionChange = this.handleQuestionChange.bind(this);
        this.addCard = this.addCard.bind(this);
    }
    addCard() {
        const { question, answer } = this.state;
        if (question !== '' && answer !== '') {
            const title = this.props.navigation.state.params.title;
            this.props.screenProps.handleNewQuestionSubmission(title, { question, answer }).then(newDeck => {
                this.props.navigation.navigate('Deck', { deck: newDeck })
            });
        }
    }
    handleAnswerChange(a) {
        this.setState({ answer: a });
    }
    handleQuestionChange(q) {
        this.setState({ question: q });
    }
    render() {
        return (
            <KeyBoardShift behavior='padding' style={styles.container}>
                {() => (
                    <View style={styles.container}>
                        <TextInput value={this.state.question} style={styles.input} underlineColorAndroid='#d3d3d3' selectionColor={appTheme.tabIconColor} onSubmitEditing={_ => this.answerField.focus()} onChangeText={this.handleQuestionChange} placeholder="Question" />
                        <TextInput value={this.state.answer} ref={answerField => this.answerField = answerField} underlineColorAndroid='#d3d3d3' selectionColor={appTheme.tabIconColor} onSubmitEditing={this.addCard} style={styles.input} onChangeText={this.handleAnswerChange} placeholder="Answer" />
                        <TouchableOpacity style={styles.button} onPress={this.addCard}>
                            <Text style={styles.buttonText}>Add</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </KeyBoardShift>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        paddingLeft: 6,
        paddingBottom: 6,
        width: 250
    },
    button: {
        backgroundColor: appTheme.themeBgColor,
        width: 100,
        height: 30,
        borderRadius: 5,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: appTheme.tabIconColor
    }
});

export default AddCard;