import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  PanResponder,
  Animated
} from "react-native";
import CustomIcon from "../assets/Icon";

export default class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY() //Step 1
    };

    this.panResponder = PanResponder.create({
      //Step 2
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        {
          //Step 3
          dx: this.state.pan.x,
          dy: this.state.pan.y
        }
      ]),
      onPanResponderRelease: (e, gesture) => {
        Animated.spring(
          //Step 1
          this.state.pan, //Step 2
          { toValue: { x: 0, y: 0 } } //Step 3
        ).start();
      }
    });
  }
  selected() {}
  render() {
    return (
      <Animated.View
        style={[styles.instrument, this.state.pan.getLayout()]}
        {...this.panResponder.panHandlers}
      >
        <View style={styles.knob} />
        <View style={styles.light} />
        <Text style={styles.text}>Filter</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  knob: {
    borderRadius: 8,
    width: 15,
    height: 15,
    backgroundColor: "white"
  },
  light: {
    borderRadius: 5,
    width: 10,
    height: 10,
    backgroundColor: "white"
  },
  text: {
    color: "white",
    fontFamily: "Futura",
    fontSize: 10
  },
  instrument: {
    backgroundColor: "#333",
    borderRadius: 10,
    justifyContent: "space-around",
    alignItems: "center",
    height: Dimensions.get("screen").height / 8,
    width: Dimensions.get("screen").width / 10
  }
});
