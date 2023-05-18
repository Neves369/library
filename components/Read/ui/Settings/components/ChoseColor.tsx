import { Theme } from "@epubjs-react-native/core";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { dark, light, sepia } from "../../Theme";
import { IChoseColor } from "./settingsTypes";

const ChoseColor = (props: IChoseColor) => {
  return (
    <View style={{ marginTop: 16, width: "100%" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
        }}
      >
        <TouchableOpacity
          style={{
            padding: 40,
            borderRadius: 9999,
            backgroundColor: "black",
          }}
          onPress={() => {
            props.changeTheme(dark);
            props.setTheme(dark);
          }}
        ></TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 40,
            borderRadius: 9999,
            backgroundColor: "#fff",
          }}
          onPress={() => {
            props.changeTheme(light);
            props.setTheme(light);
          }}
        ></TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 40,
            borderRadius: 9999,
            backgroundColor: "#e8dcb8",
          }}
          onPress={() => {
            props.changeTheme(sepia);
            props.setTheme(sepia);
          }}
        ></TouchableOpacity>
      </View>
    </View>
  );
};

export default ChoseColor;
