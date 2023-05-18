import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { IChoseFont } from "./settingsTypes";
import React from "react";

const ChoseFont = (props: IChoseFont) => {
  return (
    <View style={{ marginTop: 20, width: "100%" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            props.changeFontFamily("Arial");
            props.setFontFamiles("Arial");
          }}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Ionicons
            name="md-text"
            size={34}
            style={{
              color: props.fontFamiles == "Arial" ? "#9190e0" : "white",
            }}
          />
          <Text
            style={{
              color: props.fontFamiles == "Arial" ? "#9190e0" : "gray",
            }}
          >
            Arial Serif
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.changeFontFamily("Courier New");
            props.setFontFamiles("Courier New");
          }}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Ionicons
            name="ios-text-sharp"
            size={34}
            style={{
              color: props.fontFamiles == "Courier New" ? "#9190e0" : "white",
            }}
          />
          <Text
            style={{
              color: props.fontFamiles == "Courier New" ? "#9190e0" : "gray",
            }}
          >
            Courier New
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.changeFontFamily("Times New Roman");
            props.setFontFamiles("Times New Roman");
          }}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Ionicons
            name="ios-text-outline"
            size={34}
            style={{
              color:
                props.fontFamiles == "Times New Roman" ? "#9190e0" : "white",
            }}
          />
          <Text
            style={{
              color:
                props.fontFamiles == "Times New Roman" ? "#9190e0" : "gray",
            }}
          >
            Times Roman
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.changeFontFamily('"Brush Script MT", cursive');
            props.setFontFamiles('"Brush Script MT", cursive');
          }}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <MaterialCommunityIcons
            name="format-font"
            size={34}
            style={{
              color:
                props.fontFamiles == '"Brush Script MT", cursive'
                  ? "#9190e0"
                  : "white",
            }}
          />
          <Text
            style={{
              color:
                props.fontFamiles == '"Brush Script MT", cursive'
                  ? "#9190e0"
                  : "gray",
            }}
          >
            Brush Script
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChoseFont;
