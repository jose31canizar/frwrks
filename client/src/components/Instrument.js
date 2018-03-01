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
import { Audio } from "expo";
import Filter from "./Filter";

const InstrumentButton = props => (
  <TouchableOpacity
    style={styles.instrument}
    onPress={() => {
      props.selected();
    }}
  >
    <CustomIcon name="Piano" />
    <Text style={styles.text}>Piano</Text>
  </TouchableOpacity>
);

const Note = props => (
  <TouchableOpacity style={props.style} onPress={() => props.playNote()} />
);

const InstrumentNotes = props => (
  <View style={styles.notes}>
    <Note style={styles.whiteNote} playNote={props.playNote} />
    <Note style={styles.blackNote} playNote={props.playNote} />
    <Note style={styles.whiteNote} playNote={props.playNote} />
    <Note style={styles.blackNote} playNote={props.playNote} />
    <Note style={styles.whiteNote} playNote={props.playNote} />
    <Note style={styles.whiteNote} playNote={props.playNote} />
    <Note style={styles.blackNote} playNote={props.playNote} />
    <Note style={styles.whiteNote} playNote={props.playNote} />
    <Note style={styles.blackNote} playNote={props.playNote} />
    <Note style={styles.whiteNote} playNote={props.playNote} />
  </View>
);

const InstrumentPanel = props => (
  <View>
    <Filter />
    <InstrumentNotes playNote={props.playNote} />
  </View>
);

export default class Instrument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      note: "c6"
    };
    this.selected = this.selected.bind(this);
    this.playNote = this.playNote.bind(this);
  }
  async playNote() {
    console.log("playing note");
    const soundObject = new Audio.Sound();
    // const source = {
    //   uri: "http://www.slspencer.com/Sounds/Chewbacca/Chewie3.mp3"
    // };
    const source = require(`../assets/sounds/c6.wav`);
    try {
      await Audio.setIsEnabledAsync(true);
      const sound = new Audio.Sound();
      await sound.loadAsync(source);
      await sound.playAsync();
    } catch (error) {
      console.error(error);
    }
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
        {open ? <InstrumentPanel playNote={this.playNote} /> : null}
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
