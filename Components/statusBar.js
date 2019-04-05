import React from "react";
import {View,StatusBar,StyleSheet} from "react-native"
import {Constants} from "expo"
import {bgColor} from "../Utils/helper";

const Statusbar = (props)=>{
    return (
        <View style={styles.main}>
<StatusBar {...props} />
        </View>
    );
};

const styles=StyleSheet.create({
main:{
    height:Constants.statusBarHeight,
    backgroundColor:bgColor
}
});

export default Statusbar;