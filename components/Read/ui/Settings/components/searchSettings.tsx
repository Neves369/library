import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Theme } from "@epubjs-react-native/core";
import Toast from "react-native-toast-message";
import { AntDesign } from "@expo/vector-icons";
import { ISearch } from "./settingsTypes";
import I18n from "i18n-js";
import React from "react";

const SearchSettings = (props: ISearch) => {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <TextInput
          style={{
            backgroundColor:
              props.theme.body.background == "#121212" ? "#121212" : "#1E212C",
            padding: 12,
            fontSize: 18,
            lineHeight: 28,
            fontWeight: "700",
            color: "#ffffff",
            width: "83.333333%",
            borderRadius: 6,
          }}
          placeholderTextColor="#fff"
          placeholder={"Digite algo..."}
          value={props.term}
          onChangeText={(text) => props.setTerm(text)}
        />

        <TouchableOpacity
          onPress={() =>
            props.term.length > 5
              ? props.search(props.term)
              : Toast.show({
                  text1: I18n.t("Mínimo de 5 caracteres"),
                  type: "error",
                })
          }
          style={{
            backgroundColor:
              props.theme.body.background == "#121212" ? "#121212" : "#1E212C",
            padding: 12,
            borderRadius: 6,
          }}
        >
          <AntDesign name="search1" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {props.term
        ? props.searchResults.map((item) => (
            <TouchableOpacity
              onPress={() => props.goToLocation(item.cfi)}
              key={item.cfi}
              style={{
                backgroundColor:
                  props.theme.body.background == "#121212"
                    ? "#121212"
                    : "#1E212C",
                padding: 16,
                marginTop: 16,
                marginBottom: 16,
                borderRadius: 6,
              }}
            >
              <Text style={{ color: "white" }}>{item.excerpt}</Text>
            </TouchableOpacity>
          ))
        : null}
    </View>
  );
};

export default SearchSettings;
