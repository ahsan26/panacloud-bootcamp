import React, { Fragment } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import { appTheme } from "../Utils/helper";
import { FontAwesome } from "@expo/vector-icons";
import ShowResult from "./showResult";

class Quiz extends React.Component {
    constructor() {
        super();
        this.state = {
            currentQuestion: 0,
            correctCount: 0,
            faceUp: true
        };
        this.flip = this.flip.bind(this);
        this.handleCorrect = this.handleCorrect.bind(this);
        this.handleWrong = this.handleWrong.bind(this);
        this.restartQuiz = this.restartQuiz.bind(this);
    }
    flip() {
        this.setState(prevState => ({
            faceUp: !prevState.faceUp
        }))
    }
    handleCorrect() {
        this.setState(prevState => ({
            currentQuestion: ++prevState.currentQuestion,
            faceUp: true,
            correctCount: ++prevState.correctCount
        }))
    }
    handleWrong() {
        this.setState(prevState => ({
            currentQuestion: ++prevState.currentQuestion,
            faceUp: true
        }))
    }
    restartQuiz() {
        this.setState({
            correctCount: 0,
            currentQuestion: 0,
            faceUp: true
        })
    }
    render() {
        const { currentQuestion } = this.state;
        const totalQuestions = this.props.navigation.state.params.deck.questions.length;
        const { question, answer } = (totalQuestions) && (currentQuestion < totalQuestions)
            ? this.props.navigation.state.params.deck.questions[currentQuestion]
            : { question: null, answer: null };

        return (!totalQuestions) ? (
            <View style={styles.noQcontainer}>
                <Text style={styles.indicatorText}>No Questions To Start Quiz!</Text>
            </View>
        ) : (currentQuestion >= totalQuestions)
                ? <ShowResult totalQuestions={totalQuestions} correctCount={this.state.correctCount} navigation={this.props.navigation} restartQuiz={this.restartQuiz} />
                : (
                    <View style={styles.root}>
                        <Text style={styles.indicatorText}>{currentQuestion + 1} / {totalQuestions}</Text>
                        <ScrollView>
                            <View>
                                <Text style={styles.questionAnswerTxt}>{this.state.faceUp ? question : answer}</Text>
                                <Text onPress={this.flip} style={styles.flipBTN}>{this.state.faceUp ? 'Show Answer' : "Show Question"}</Text>
                            </View>
                        </ScrollView>
                        <View style={styles.actionTakingContainer}>
                            <TouchableOpacity style={[styles.btn, { backgroundColor: '#27ae60' }]} onPress={this.handleCorrect}>
                                <Text><FontAwesome name="check" size={32} color={'#fff'} /></Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.btn, { backgroundColor: 'red' }]} onPress={this.handleWrong}>
                                <Text><FontAwesome name="times" size={32} color={'#fff'} /></Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    noQcontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    indicatorText: {
        color: 'gray',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 5
    },
    questionAnswerTxt: {
        marginTop: 50,
        fontSize: 30,
        textAlign: 'center'
    },
    flipBTN: {
        color: appTheme.lineColor,
        textAlign: 'center',
        fontSize: 16,
        marginTop: 10
    },
    btn: {
        width: 75,
        height: 75,
        borderRadius: 75,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff'
    },
    actionTakingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around', marginBottom: 100
    }
});

export default Quiz;