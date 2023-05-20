import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useNetInfo } from "@react-native-community/netinfo";
import Slider from "@react-native-community/slider";
import I18n from "i18n-js";
import React, { memo, useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ChoseColor from "./components/ChoseColor";
import ChoseFont from "./components/ChoseFont";
import SearchSettings from "./components/searchSettings";
import TocSettings from "./components/TocSettings";
import { IReadSettings } from "./readerTypes";

const Settings = (props: IReadSettings) => {
  const { isConnected } = useNetInfo();
  const [term, setTerm] = React.useState("");
  const [searchState, setSearchState] = useState(false);

  return (
    <>
      <GestureHandlerRootView
        renderToHardwareTextureAndroid={true}
        style={{
          flex: props.isVisible ? 1 : 0,
        }}
      >
        <BottomSheetModalProvider>
          <BottomSheet
            handleIndicatorStyle={{ backgroundColor: "white" }}
            enablePanDownToClose={false}
            onClose={() => props.setIsVisible(false)}
            bottomInset={0}
            backgroundStyle={{
              backgroundColor:
                props.theme.body.background === "#121212"
                  ? "#282828"
                  : "#121212",
            }}
            snapPoints={[200, "50%", "100%"]}
            animateOnMount={true}
            backdropComponent={() => (
              <Pressable
                onPress={() => props.setIsVisible(!props.isVisible)}
                style={{
                  height: props.isVisible ? "100%" : 0,
                }}
              ></Pressable>
            )}
          >
            <BottomSheetScrollView style={{ padding: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 24,
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor:
                      props.theme.body.background === "#121212"
                        ? "gray"
                        : "#121212",
                  }}
                  onPress={() => {
                    props.setShow(false);
                  }}
                >
                  <MaterialIcons
                    name="keyboard-return"
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
                {isConnected ? (
                  <TouchableOpacity
                    style={{
                      backgroundColor:
                        props.theme.body.background === "#121212"
                          ? "gray"
                          : "#121212",
                    }}
                    onPress={() => {}}
                  >
                    <Ionicons
                      name="chatbubbles-outline"
                      size={24}
                      color="white"
                    />
                  </TouchableOpacity>
                ) : null}

                <TouchableOpacity
                  onPress={() => setSearchState(!searchState)}
                  style={{
                    backgroundColor:
                      props.theme.body.background === "#121212"
                        ? "gray"
                        : "#121212",
                  }}
                >
                  {searchState ? (
                    <Ionicons name="close" size={24} color="white" />
                  ) : (
                    <AntDesign name="search1" size={24} color="white" />
                  )}
                </TouchableOpacity>
              </View>

              {!searchState ? (
                <>
                  <View
                    style={{
                      marginBottom: 28,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{ color: "#ffffff", fontSize: 18, lineHeight: 28 }}
                    >
                      {"Progresso "}{" "}
                    </Text>
                    <Text
                      style={{ color: "#ffffff", fontSize: 18, lineHeight: 28 }}
                    >
                      {props.currentLocation?.end.displayed.page} {"de"}{" "}
                      {props.currentLocation?.end.displayed.total}{" "}
                      {props.currentLocation?.end.displayed.total == 1
                        ? "cfi"
                        : "cfi's"}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <MaterialCommunityIcons
                      name="format-font-size-decrease"
                      size={24}
                      color="white"
                    />
                    <Slider
                      style={{ width: 300, height: 50 }}
                      minimumValue={15}
                      onValueChange={(value) => {
                        props.changeFontSize(`${value}px`);
                        props.setFontSize(value);
                      }}
                      maximumValue={35}
                      thumbTintColor="white"
                      step={1}
                      value={props.fontSize}
                      tapToSeek={true}
                      minimumTrackTintColor="#fff"
                      maximumTrackTintColor="#fff"
                    />
                    <MaterialCommunityIcons
                      name="format-font-size-increase"
                      size={24}
                      color="white"
                    />
                  </View>

                  <ChoseFont
                    setFontFamiles={props.setFontFamiles}
                    fontFamiles={props.fontFamiles}
                    changeFontFamily={props.changeFontFamily}
                  />

                  <ChoseColor
                    theme={props.theme}
                    setTheme={props.setTheme}
                    changeTheme={props.changeTheme}
                  />

                  <TocSettings
                    toc={props.toc}
                    theme={props.theme}
                    goToLocation={props.goToLocation}
                  />
                </>
              ) : (
                <View>
                  <SearchSettings
                    searchResults={props.searchResults}
                    search={props.search}
                    goToLocation={props.goToLocation}
                    theme={props.theme}
                    term={term}
                    setTerm={setTerm}
                  />
                </View>
              )}
            </BottomSheetScrollView>
          </BottomSheet>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </>
  );
};

export default memo(Settings);
