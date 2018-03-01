import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";
import { Tabs, Tab, TabHeading } from "native-base";
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
  <View
    style={[
      styles.trackBeat,
      { backgroundColor: props.playing[props.index] ? "#888" : "black" }
    ]}
  />
);

const Track = props => (
  <View style={styles.track}>
    <PlayButton
      playing={props.playing}
      pause={props.pause}
      play={props.play}
      index={props.index}
    />
    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((beat, i) => (
      <TrackBeat key={i} index={props.index} playing={props.playing} />
    ))}
  </View>
);

const EnsembleButton = props => (
  <View style={styles.ensembleButton}>
    <Text style={styles.text}>Ensemble</Text>
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
    this.setState((prevState, props) => {
      var newPlaying = prevState.playing;
      newPlaying[i] = true;
      return { playing: newPlaying };
    });
  }
  pause(i) {
    this.setState((prevState, props) => {
      var newPlaying = prevState.playing;
      newPlaying[i] = false;
      return { playing: newPlaying };
    });
  }
  render() {
    const tracks = [0, 1, 2, 3, 4, 5, 6, 7];

    const tabs = [0, 1, 2];
    return (
      <View style={styles.container}>
        <Tabs initialPage={1}>
          {tabs.map((tab, i) => (
            <Tab
              key={i}
              heading={
                <TabHeading>
                  <EnsembleButton name="ensemble" />
                </TabHeading>
              }
            >
              {tracks.map((track, i) => (
                <Track
                  key={i}
                  index={i}
                  playing={this.state.playing}
                  play={this.play}
                  pause={this.pause}
                />
              ))}
            </Tab>
          ))}
        </Tabs>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Futura",
    fontWeight: "100",
    fontSize: 13,
    color: "#cecece"
  },
  ensembleButton: {
    borderWidth: 2,
    borderColor: "#cecece",
    borderRadius: 5,
    padding: 4
  },
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
