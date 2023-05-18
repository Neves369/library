import { Text, TouchableOpacity, View } from "react-native";
import { Theme } from "@epubjs-react-native/core";
import { IToc } from "./settingsTypes";
import I18n from "i18n-js";
import React from "react";
import Codigo from "../../../../../utils/Codigo";

const TocSettings = (props: IToc) => {
  return (
    <View style={{ marginTop: 16, marginBottom: 16 }}>
      <Text
        style={{
          marginBottom: 16,
          color: "#ffffff",
          fontSize: 24,
          lineHeight: 32,
        }}
      >
        capítulos
      </Text>
      {props.toc.map((toc) => (
        <TouchableOpacity
          onPress={() => props.goToLocation(toc.href)}
          key={Codigo.gerar()}
          style={{
            backgroundColor:
              props.theme.body.background == "#121212" ? "gray" : "#1E212C",
            padding: 0,
            paddingLeft: 16,
            margin: 0,
            marginBottom: 8,
            justifyContent: "center",
            borderRadius: 8,
          }}
        >
          <Text style={{ padding: 0, margin: 0, color: "#ffffff" }}>
            {toc.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TocSettings;
