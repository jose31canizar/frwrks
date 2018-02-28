import React, { Component } from "react";
import { ScrollView, View, Text, StyleSheet, Dimensions } from "react-native";
import Instrument from "./Instrument";
import Filter from "./Filter";
import CustomIcon from "../assets/Icon";

const SequenceDisplay = props => (
  <View style={styles.sequenceDisplay}>
    {props.cells.map((cell, i) => <View key={i} style={styles.sequenceCell} />)}
  </View>
);

const InstrumentRack = props => (
  <View style={styles.instrumentRack}>
    <Instrument />
    <CustomIcon name="Connection" fill="#111" stroke="black" />
    <Filter />
  </View>
);

export default class Configuration extends Component {
  render() {
    const cells = Array.apply(null, { length: 16 }).map(Number.call, Number);
    return (
      <View style={styles.container}>
        <SequenceDisplay cells={cells} />
        <InstrumentRack />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Roboto_light",
    letterSpacing: 1,
    fontSize: 18
  },
  container: {
    height: "100%",
    backgroundColor: "white"
  },
  sequenceDisplay: {
    width: "100%",
    height: Dimensions.get("screen").height / 4,
    backgroundColor: "white",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  instrumentRack: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#ECAA83",
    paddingVertical: 5,
    alignItems: "center",
    paddingHorizontal: 10
  },
  sequenceCell: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#888",
    width: Dimensions.get("screen").width / 40,
    height: Dimensions.get("screen").height / 20,
    marginHorizontal: 5
  }
});
