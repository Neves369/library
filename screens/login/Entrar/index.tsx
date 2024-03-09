import Background from "../../../assets/background.png";
import userService from "../../../service/userService";
import { useForm, Controller } from "react-hook-form";
import * as Animatable from "react-native-animatable";
import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../../contexts/auth";
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
  Animated,
} from "react-native";

import { Text, useTheme, ActivityIndicator } from "react-native-paper";

const Entrar: React.FC = ({ navigation }: any) => {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const [keyboardShow, setKeyboardShow] = useState(false);
  const { signIn, showMessage }: any = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data: any) => {
    setLoading(true);

    await userService
      .login(data)
      .then((resp: any) => {
        if (resp.status == 200) {
          signIn(resp.data);
        } else {
          showMessage(resp.Erro);
        }
      })
      .catch((resp: any) => {
        showMessage(resp);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // mostrar teclado
  function KeyboardDidShow() {
    setKeyboardShow(true);
  }

  // esconder teclado
  function KeyboardDidHide() {
    setKeyboardShow(false);
  }

  // Ouve os eventos de show e hide do teclado
  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", KeyboardDidShow);
    Keyboard.addListener("keyboardDidHide", KeyboardDidHide);
  }, []);

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
          style={{ display: !keyboardShow ? "flex" : "none" }}
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
          <Controller
            control={control}
            name="email"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
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
                  autoCapitalize="none"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  maxLength={60}
                  onBlur={onBlur}
                  onChangeText={(value: any) => onChange(value)}
                  value={value}
                />
              </View>
            )}
          />
          {errors.email && (
            <Text style={{ color: colors.error }}>E-mail é obrigatório.</Text>
          )}

          <Controller
            control={control}
            name="senha"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View
                style={{
                  height: 40,
                  width: "100%",
                  borderRadius: 10,
                  backgroundColor: "#f1f3f6",
                  marginTop: 10,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Entypo
                  style={styles.inputIcon}
                  name="lock"
                  size={24}
                  color="#5352A0"
                />
                <TextInput
                  style={{
                    height: 40,
                    flex: 1,
                    fontSize: 16,
                    color: "#333",
                  }}
                  placeholder="Senha"
                  secureTextEntry={true}
                  maxLength={12}
                  autoCapitalize="none"
                  onBlur={onBlur}
                  onChangeText={(value: any) => onChange(value)}
                  value={value}
                />
              </View>
            )}
          />
          {errors.senha && (
            <Text style={{ color: colors.error }}>Senha é obrigatória.</Text>
          )}
          <Text
            style={{
              color: "#5352A0",
              marginTop: 10,
              alignSelf: "flex-end",
              fontSize: 16,
            }}
            onPress={() => {
              navigation.navigate("EsqueciASenha");
            }}
          >
            Esqueceu a senha?
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: !loading ? "#5352A0" : "grey",
              flexDirection: "row",
              padding: 10,
              borderRadius: 8,
              marginTop: 10,
            }}
            onPress={handleSubmit(!loading ? handleLogin : () => {})}
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
              Entrar
            </Text>
          </TouchableOpacity>

          <Text style={{ marginTop: 10, color: "black" }}>
            Retornar a tela anterior?
            <Text
              style={{ color: "#5352A0" }}
              onPress={() => {
                navigation.navigate("EntrarCom");
              }}
            >
              {" Retornar"}
            </Text>
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Entrar;

const styles = StyleSheet.create({
  titleText: {
    top: Dimensions.get("screen").height * 0.1,
    position: "absolute",
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
