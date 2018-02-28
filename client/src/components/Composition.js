import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";
import CustomIcon from "../assets/Icon";

const PlayButton = props => (
  <TouchableOpacity
    style={styles.playButton}
    onPress={() =>
      props.playing[props.index] == true
        ? props.pause(props.index)
        : props.play(props.index)
    }
  >
    <CustomIcon
      name={props.playing[props.index] == true ? "Play" : "Pause"}
      fill="#999"
    />
  </TouchableOpacity>
);

const TrackBeat = props => (
  <View style={styles.trackBeat} index={props.index} />
);

const Track = props => (
  <View style={styles.track}>
    <PlayButton
      playing={props.playing}
      pause={props.pause}
      play={props.play}
      index={props.index}
    />
    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((beat, i) => <TrackBeat key={i} />)}
  </View>
);

export default class Composition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: [0, 1, 2, 3, 4, 5, 6, 7].map((track, i) => false)
    };
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
  }
  play(i) {
    console.log("play");
    this.setState((prevState, props) => {
      var newPlaying = prevState.playing;
      newPlaying[i] = true;
      console.log(newPlaying);
      return { playing: newPlaying };
    });
  }
  pause(i) {
    this.setState((prevState, props) => {
      var newPlaying = prevState.playing;
      newPlaying[i] = false;
      console.log(newPlaying);
      return { playing: newPlaying };
    });
  }
  render() {
    const tracks = [0, 1, 2, 3, 4, 5, 6, 7];
    return (
      <View style={styles.container}>
        {tracks.map((track, i) => (
          <Track
            key={i}
            index={i}
            playing={this.state.playing}
            play={this.play}
            pause={this.pause}
          />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  playButton: {
    paddingHorizontal: 10
  },
  trackBeat: {
    width: 10,
    height: 35,
    marginHorizontal: 10,
    backgroundColor: "#333"
  },
  track: {
    width: "100%",
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  }
});
