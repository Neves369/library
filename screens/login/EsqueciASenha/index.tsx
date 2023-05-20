import Background from "../../../assets/background.png";
import React, { useState, useEffect } from "react";
import LottieView from "lottie-react-native";
import { Entypo } from "@expo/vector-icons";
import {
  View,
  Keyboard,
  TextInput,
  Dimensions,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";

import { Text } from "react-native-paper";
import * as Animatable from "react-native-animatable";

const EsqueciASenha: React.FC = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timerCount, setTimer] = useState<number>(0);

  useEffect(() => {
    if (timerCount != 0) {
      let interval = setInterval(() => {
        if (timerCount > 0) {
          setTimer((lastTimerCount) => {
            lastTimerCount <= 1 && clearInterval(interval);
            return lastTimerCount - 1;
          });
        }
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setLoading(false);
    }
  }, [timerCount]);

  const Enviar = async () => {
    setLoading(true);
    if (timerCount == 0) {
      setTimer(90);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ImageBackground
            style={{ flex: 1 }}
            resizeMode="stretch"
            source={Background}
          />
        </View>
        <Animatable.Text
          style={[styles.titleText, { zIndex: 1 }]}
          animation="fadeInUp"
          delay={1200}
        >
          Litterae
        </Animatable.Text>

        <LottieView
          speed={0.5}
          source={require("../../../assets/images/rocket.json")}
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
            RECUPERAR
          </Text>
          <Text style={{ marginTop: 10, color: "black" }}>
            {enviado
              ? "Foi enviada uma mensagem ao seu e-mail com as instruções para recuperação da sua senha."
              : "Por favor confirme seu E-mail, será enviado um e-mail para auxiliá-lo na recuperação de sua conta"}
          </Text>

          <View
            style={{
              height: 40,
              borderRadius: 10,
              backgroundColor: "#f1f3f6",
              marginTop: 10,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Entypo
              name="email"
              size={24}
              color="#5352A0"
              style={styles.inputIcon}
            />
            <TextInput
              style={{
                height: 40,
                width: "100%",
                flex: 1,
                fontSize: 16,
                color: "#333",
              }}
              placeholder="E-mail"
              maxLength={60}
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              onChangeText={(text: any) => setEmail(text)}
            />
          </View>
          {timerCount == 0 ? (
            <></>
          ) : (
            <Text style={{ color: "black" }}>
              Nova tentativa em {timerCount}
              {timerCount == 1 ? " segundo" : " segundos"}
            </Text>
          )}
          <TouchableOpacity
            style={{
              backgroundColor: timerCount == 0 ? "#5352A0" : "grey",
              flexDirection: "row",
              padding: 10,
              borderRadius: 8,
              marginTop: 10,
            }}
            onPress={() => {
              if (email && !loading) {
                Enviar();
              }
            }}
          >
            {loading ? (
              <ActivityIndicator animating={true} color="white" />
            ) : (
              <Entypo
                name="bookmark"
                style={{ width: 25 }}
                size={24}
                color="white"
              />
            )}
            <Text
              style={{
                textAlign: "center",
                width: "85%",
                color: "#fff",
                fontSize: 18,
              }}
            >
              Enviar
            </Text>
          </TouchableOpacity>

          <Text style={{ marginTop: 10, color: "black" }}>
            Retornar a tela de Login?
            <Text
              style={{
                color: "#5352A0",
              }}
              onPress={() => {
                navigation.navigate("Entrar");
              }}
            >
              {" Entrar"}
            </Text>
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EsqueciASenha;

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
  inputIcon: {
    paddingHorizontal: 8,
  },
});
