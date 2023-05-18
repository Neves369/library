import { Text, useTheme, ActivityIndicator } from "react-native-paper";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInputMask } from "react-native-masked-text";
import Background from "../../../assets/background.png";
import { useForm, Controller } from "react-hook-form";
import * as Animatable from "react-native-animatable";
import React, { useState, useContext } from "react";
import AuthContext from "../../../contexts/auth";
import LottieView from "lottie-react-native";
import {
  View,
  Keyboard,
  TextInput,
  Dimensions,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

const Cadastrar: React.FC = ({ navigation }: any) => {
  const { colors } = useTheme();
  const [userInfo, setUserInfo] = useState();
  const [loading, setLoading] = useState(false);
  const { signIn }: any = useContext(AuthContext);
  const [screen, setScreen] = useState("básicos");
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const changeScreen = (data: any) => {
    setUserInfo(data);
    reset();
    setScreen("E-mail");
  };

  const handleCadastrar = async (data: any) => {
    // let user = {
    //   cpf: ncpf,
    //   dataNascimento: Moment(userInfo?.DataNascimento, 'DD/MM/YYYY').format('YYYY-MM-DD'),
    //   senha1: data.Senha,
    //   senha2: data.Confirmar_Senha
    // }
    // await LoginService.primeiroAcesso(user)
    // .then((resp: any)=>{
    //   if(resp.status == 200){
    //     setLoading(false)
    //     if (resp.data.length >= 2){
    //       navigation.navigate('EscolherSubContrato', resp.data);
    //     }
    //     else{
    //       signIn(resp.data[0])
    //     }
    //   }
    //   if(Math.trunc(resp.status/ 100)== 4){
    //     return(
    //       setLoading(false),
    //       setTitle("Aviso"),
    //       setMessage(resp.titulo),
    //       setVisible(true)
    //     )
    //   }
    //   if(Math.trunc(resp.status / 100) == 5){
    //     return(
    //       setLoading(false),
    //       setTitle("Erro"),
    //       setMessage(resp.titulo),
    //       setVisible(true)
    //     )
    //   }
    // })
    // .catch((resp: any)=>{
    //   return(
    //     setLoading(false)
    //   )
    // })
  };

  function renderFirst() {
    return (
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
          CADASTRAR
        </Text>

        <Controller
          control={control}
          name="Email"
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
        {errors.Email && (
          <Text style={{ color: colors.error }}>E-mail é obrigatório.</Text>
        )}

        <Controller
          control={control}
          name="DataNascimento"
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
              <MaterialCommunityIcons
                name="calendar-month"
                size={24}
                color="#5352A0"
                style={styles.inputIcon}
              />
              <TextInputMask
                style={{
                  color: "#333",
                  flex: 1,
                  width: "80%",
                  height: "100%",
                }}
                placeholder="Data de nascimento"
                keyboardType="numeric"
                type={"custom"}
                options={{
                  mask: "99/99/9999",
                }}
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={(value: any) => onChange(value)}
                value={value}
              />
            </View>
          )}
        />
        {errors.DataNascimento && (
          <Text style={{ color: colors.error }}>
            Data de nascimento é obrigatório.
          </Text>
        )}

        <TouchableOpacity
          style={{
            backgroundColor: "#5352A0",
            flexDirection: "row",
            padding: 10,
            borderRadius: 8,
            marginTop: 10,
          }}
          onPress={handleSubmit(changeScreen)}
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
            Próximo
          </Text>
        </TouchableOpacity>

        <Text style={{ marginTop: 10, color: "black" }}>
          Já possui uma conta?
          <Text
            style={{
              color: "#5352A0",
            }}
            onPress={() => {
              navigation.navigate("EntrarCom");
            }}
          >
            {" Entrar"}
          </Text>
        </Text>
      </View>
    );
  }

  function renderSecond() {
    return (
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
          CADASTRAR
        </Text>

        <Controller
          control={control}
          name="Senha"
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
                style={styles.inputIcon}
                name="lock"
                size={24}
                color="#5352A0"
              />
              <TextInput
                style={{
                  height: 40,
                  width: "100%",
                  flex: 1,
                  fontSize: 16,
                  color: "#333",
                }}
                placeholder="Senha"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                maxLength={12}
                onBlur={onBlur}
                onChangeText={(value: any) => onChange(value)}
                value={value}
              />
            </View>
          )}
        />
        {errors.Senha && (
          <Text style={{ color: colors.error }}>Senha é obrigatória.</Text>
        )}

        <Controller
          control={control}
          name="Confirmar_Senha"
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
                style={styles.inputIcon}
                name="lock"
                size={24}
                color="#5352A0"
              />
              <TextInput
                style={{
                  height: 40,
                  width: "100%",
                  flex: 1,
                  fontSize: 16,
                  color: "#333",
                }}
                placeholder="Confirmar senha"
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
        {errors.Confirmar_Senha && (
          <Text style={{ color: colors.error }}>
            A confirmação da senha é obrigatória.
          </Text>
        )}

        <TouchableOpacity
          style={{
            backgroundColor: "#5352A0",
            flexDirection: "row",
            padding: 10,
            borderRadius: 8,
            marginTop: 10,
          }}
          onPress={handleSubmit(handleCadastrar)}
        >
          <Entypo
            name="bookmark"
            style={{ width: 25 }}
            size={24}
            color="white"
          />
          {loading ? (
            <ActivityIndicator animating={true} color={"white"} />
          ) : (
            <Text
              style={{
                textAlign: "center",
                width: "85%",
                color: "#fff",
                fontSize: 18,
              }}
            >
              Cadastrar
            </Text>
          )}
        </TouchableOpacity>

        <Text style={{ marginTop: 10 }}>
          Retornar a etapa anterior?
          <Text
            style={{
              color: "#5352A0",
            }}
            onPress={() => {
              setScreen("básicos"), reset();
            }}
          >
            {" Retornar"}
          </Text>
        </Text>
      </View>
    );
  }

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
          resizeMode="contain"
        />
        {screen == "básicos" ? renderFirst() : renderSecond()}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Cadastrar;

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
