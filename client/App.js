import React, { Component } from "react";
import { Router, Scene, Actions, Modal } from "react-native-router-flux";
import { StyleSheet, Text, Platform } from "react-native";

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { Provider, connect } from "react-redux";
// import { apiMiddleware } from "./src/middleware";
import rootReducer from "./src/reducers";

import Login from "./src/components/login/Login";
import Signup from "./src/components/signup/Signup";
import Layout from "./src/components/layout/Layout";

// Create Redux store
const store = createStore(rootReducer, {}, applyMiddleware(thunk));

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }
  componentWillReceiveProps(newProps) {
    if (newProps.isLoggedIn === true) {
      this.enterApp();
    }
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Roboto_light: require("./src/fonts/Roboto-Light.ttf"),
      Avenir: require("./src/fonts/avenir.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });

    this.setState({ isReady: true });
  }
  enterApp() {
    this.setState({ enteredApp: true });
  }
  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return (
      <Provider store={store}>
        <Router>
          <Scene key="root" title="root" hideNavBar panHandlers={null}>
            <Scene key="login" component={() => <Login />} title="frwrk" />
            <Scene key="signup" component={() => <Signup />} title="frwrk" />
            <Scene
              key="layout"
              component={() => <Layout />}
              title="frwrk"
              initial
            />
          </Scene>
        </Router>
      </Provider>
    );
  }
}
