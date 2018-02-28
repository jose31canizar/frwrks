import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet
} from "react-native";
import CustomIcon from "../assets/Icon";

const InstrumentButton = props => (
  <TouchableOpacity style={styles.instrument} onPress={() => props.selected()}>
    <CustomIcon name="Piano" />
    <Text style={styles.text}>Piano</Text>
  </TouchableOpacity>
);

const InstrumentNotes = props => (
  <View style={styles.notes}>
    <View style={styles.whiteNote} />
    <View style={styles.blackNote} />
    <View style={styles.whiteNote} />
    <View style={styles.blackNote} />
    <View style={styles.whiteNote} />
    <View style={styles.whiteNote} />
    <View style={styles.blackNote} />
    <View style={styles.whiteNote} />
    <View style={styles.blackNote} />
    <View style={styles.whiteNote} />
    <View style={styles.blackNote} />
  </View>
);

export default class Instrument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.selected = this.selected.bind(this);
  }
  selected() {
    this.setState((prevState, props) => {
      return { open: !prevState.open };
    });
  }
  render() {
    const { open } = this.state;
    return (
      <ScrollView>
        <InstrumentButton selected={this.selected} />
        {open ? <InstrumentNotes /> : null}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  notes: {
    padding: 4
  },
  blackNote: {
    width: 100,
    height: 35,
    marginVertical: 5,
    marginLeft: 10,
    backgroundColor: "black"
  },
  whiteNote: {
    width: 100,
    height: 50,
    marginVertical: 5,
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
