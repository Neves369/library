import { Entypo, FontAwesome } from "@expo/vector-icons";
import Background from "../../../assets/background.png";
import * as Animatable from "react-native-animatable";
import LottieView from "lottie-react-native";
import { Text } from "react-native-paper";
import React from "react";
import {
  View,
  Keyboard,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

const EntrarCom: React.FC = ({ navigation }: any) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ImageBackground
            resizeMode="stretch"
            source={Background}
            style={{ flex: 1 }}
          />
        </View>
        <Animatable.Text
          style={styles.titleText}
          animation="fadeInUp"
          delay={1200}
        >
          Litterae
        </Animatable.Text>
        <LottieView
          speed={0.5}
          source={require("../../../assets/images/35235-reading.json")}
          autoPlay
          loop
          resizeMode="contain"
        />
        <View
          style={{
            backgroundColor: "#fff",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            padding: 20,
          }}
        >
          <Text
            style={{
              margin: 4,
              color: "#000",
              fontSize: 16,
              lineHeight: 22,
              fontWeight: "700",
            }}
          >
            LOGIN
          </Text>

          <TouchableOpacity
            style={{
              backgroundColor: "#5352A0",
              flexDirection: "row",
              padding: 10,
              borderRadius: 8,
              marginTop: 10,
            }}
            onPress={() => {
              navigation.navigate("Entrar");
            }}
          >
            <Entypo
              name="bookmark"
              style={{ width: 25 }}
              size={24}
              color="white"
            />
            <Text
              style={{
                textAlign: "center",
                width: "85%",
                color: "#fff",
                fontSize: 18,
              }}
            >
              Entrar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: "#DB4437",
              flexDirection: "row",
              padding: 10,
              borderRadius: 8,
              marginTop: 10,
            }}
            onPress={() => {}}
          >
            <FontAwesome
              name="google"
              style={{ width: 25 }}
              size={24}
              color="white"
            />
            <Text
              style={{
                textAlign: "center",
                width: "85%",
                color: "#fff",
                fontSize: 18,
              }}
            >
              Entrar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: "#3b5998",
              flexDirection: "row",
              padding: 10,
              borderRadius: 8,
              marginTop: 10,
            }}
            onPress={() => {}}
          >
            <FontAwesome
              name="facebook-f"
              style={{ width: 25 }}
              size={24}
              color="white"
            />
            <Text
              style={{
                textAlign: "center",
                width: "85%",
                color: "#fff",
                fontSize: 18,
              }}
            >
              Entrar
            </Text>
          </TouchableOpacity>

          <Text style={{ marginTop: 10, color: "black" }}>
            Não possui um conta?
            <Text
              style={{ color: "#5352A0" }}
              onPress={() => {
                navigation.navigate("Cadastrar");
              }}
            >
              {" Registrar-se"}
            </Text>
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EntrarCom;

const styles = StyleSheet.create({
  titleText: {
    position: "absolute",
    top: Dimensions.get("screen").height * 0.1,
    alignSelf: "center",
    color: "#fff",
    fontSize: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
});
