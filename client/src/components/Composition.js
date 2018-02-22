import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Composition = props => (
  <View style={styles.container}>
    <Text>Composition</Text>
  </View>
);

export default Composition;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "white"
  }
});
