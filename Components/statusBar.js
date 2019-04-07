import React from "react";
import { View, StatusBar, StyleSheet } from "react-native"
import { Constants } from "expo"
import { appTheme } from "../Utils/helper";

const Statusbar = (props) => {
    return (
        <View style={styles.main}>
            <StatusBar {...props} />
        </View>
    );
};
const { themeBgColor } = appTheme;
const styles = StyleSheet.create({
    main: {
        height: Constants.statusBarHeight,
        backgroundColor: themeBgColor
    }
});

export default Statusbar;