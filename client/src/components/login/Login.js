import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Login = props => (
  <View style={styles.container}>
    <Text>Login</Text>
  </View>
);

export default Login;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "grey"
  }
});
