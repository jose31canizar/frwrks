import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Dimensions,
  Button,
  TouchableOpacity
} from "react-native";
import {
  Container,
  Header,
  Content,
  Tab,
  Tabs,
  withNavigation,
  Footer,
  FooterTab,
  Icon,
  Button as NativeButton
} from "native-base";

import DrawerContent from "./DrawerContent";

import CustomIcon from "../../assets/Icon";

import Configuration from "../Configuration";
import Composition from "../Composition";

import { TabNavigator, TabBarBottom, StackNavigator } from "react-navigation";

export default class Layout extends Component {
  render() {
    return (
      <Container>
        <TabBar />
      </Container>
    );
  }
}

const CreatePostButton = props => (
  <TouchableOpacity onPress={() => props.navigation.navigate("create_post")}>
    <CustomIcon
      name="CreatePost"
      fill="black"
      stroke="#000000"
      strokeWidth="1.5"
    />
  </TouchableOpacity>
);

const MenuBarButton = props => (
  <TouchableOpacity
    onPress={() => props.navigation.goBack(props.routeName)}
    style={{
      width: "100%",
      paddingHorizontal: 10
    }}
  >
    <CustomIcon name="Nav" />
  </TouchableOpacity>
);

const PageStackOptions = {
  navigationOptions: ({ navigation }) => ({
    headerStyle: { paddingHorizontal: 20 },
    headerLeft:
      navigation.state.routeName === "feed" ||
      navigation.state.routeName === "suggestions" ||
      navigation.state.routeName === "profile" ? (
        <NativeButton
          transparent
          onPress={() => navigation.navigate("DrawerOpen")}
        >
          <CustomIcon name="Nav" height="40" width="40" />
        </NativeButton>
      ) : (
        <MenuBarButton
          navigation={navigation}
          routeName={navigation.routeName}
        />
      ),
    headerRight:
      navigation.state.routeName === "create_post" ? (
        <ShareSongButton navigation={navigation} />
      ) : navigation.state.routeName === "search_song" ? (
        <SelectButton navigation={navigation} />
      ) : (
        <CreatePostButton navigation={navigation} />
      ),
    headerTitle: (
      <Text
        style={{
          fontSize: 18,
          letterSpacing: 2,
          fontFamily: "Roboto_light"
        }}
      >
        frwrks
      </Text>
    )
  })
};

const compositionStack = {
  composition: {
    screen: Composition
  }
};

const CompositionStack = StackNavigator(compositionStack, PageStackOptions);

const configurationStack = {
  configuration: {
    screen: Configuration
  }
};

const ConfigurationStack = StackNavigator(configurationStack, PageStackOptions);

const TabBar = TabNavigator(
  {
    composition: {
      screen: CompositionStack
    },
    configuration: {
      screen: ConfigurationStack
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarOnPress: ({ scene, previousScene, jumpToIndex }) => {
        jumpToIndex(scene.index);
      },
      title: (
        <Text
          style={{
            fontSize: 18,
            letterSpacing: 2,
            fontFamily: "Roboto_light"
          }}
        >
          resonance
        </Text>
      ),
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        console.log(focused);
        let iconName;
        let fill;
        let strokeWidth;
        let stroke;
        if (routeName === "composition") {
          iconName = "Music";
          fill = "none";
          stroke = tintColor;
          strokeWidth = "1.5";
        } else if (routeName === "configuration") {
          iconName = "Headphones";
          fill = "none";
          stroke = tintColor;
          strokeWidth = "1.5";
        }
        return (
          <CustomIcon
            name={iconName}
            strokeWidth={strokeWidth}
            fill={fill}
            stroke={stroke}
            zIndex={1}
          />
        );
      }
    }),
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray",
      showLabel: false,
      style: { backgroundColor: "white" }
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom",
    animationEnabled: true,
    swipeEnabled: false
  }
);
