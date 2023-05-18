import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";

const LoaderBook = () => {
  return (
    <View style={{ flex: 1 }}>
      <LottieView
        speed={0.5}
        source={require("../../assets/images/book.json")}
        autoPlay
        loop
        resizeMode="contain"
      />
    </View>
  );
};

export default LoaderBook;
