import React from "react";
import { View, StyleSheet } from "react-native";
import Loader from "react-loader-spinner";

const style = StyleSheet.create({
  Centered: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default function Loading() {
  return (
    <View style={style.Centered}>
      <Loader type="Bars" />
    </View>
  );
}
