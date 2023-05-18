import React from "react";
import LottieView from "lottie-react-native";
import { Modal, Portal } from "react-native-paper";

const LoaderPage = () => {
  return (
    <Portal>
      <Modal visible={true} contentContainerStyle={{ flex: 1 }}>
        <LottieView
          speed={0.6}
          source={require("../../assets/images/book.json")}
          autoPlay
          loop
          resizeMode="contain"
        />
      </Modal>
    </Portal>
  );
};

export default LoaderPage;
