import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native"
import { withNavigation } from "react-navigation";
import { appTheme } from "../Utils/helper";
const { themeBgColor, tabIconColor } = appTheme;
class AddDeck extends React.Component {
    constructor() {
        super();
        this.state = {
            title: ''
        };
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.addDeck = this.addDeck.bind(this);
    }
    handleTitleChange(title) {
        this.setState({
            title
        });
    }
    addDeck() {
        const title = this.state.title.trim();
        if (title) {
            const { handleNewDeckSubmission } = this.props.screenProps;
            handleNewDeckSubmission(title).then(newDeck => {
                this.setState({ title: '' })
                this.props.navigation.navigate('Deck', { deck: newDeck })
            })
        } else {
            alert('Deck Title Cannot be submitted Empty!')
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput value={this.state.title} placeholder="Your Deck Title" onSubmitEditing={this.addDeck} underlineColorAndroid='#d3d3d3' selectionColor={tabIconColor} onChangeText={this.handleTitleChange} style={styles.input} />
                <TouchableOpacity style={styles.button} onPress={this.addDeck}>
                    <Text style={styles.buttonText}>Add</Text>
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
    input: {
        paddingLeft: 6,
        paddingBottom: 6,
        width: 250
    },
    button: {
        backgroundColor: themeBgColor,
        width: 100,
        height: 30,
        borderRadius: 5,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: tabIconColor
    }
});

export default withNavigation(AddDeck);