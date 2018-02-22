import { Platform } from "react-native";
export const IP = "10.201.11.174";

export default (API =
  Platform.OS === "android"
    ? "http://10.0.3.2:3000/v1" // works for Genymotion
    : `http://${IP}:3000/v1`); //10.0.0.246
