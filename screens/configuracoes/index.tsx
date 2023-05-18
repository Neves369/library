import { FloatingLabelInput } from "react-native-floating-label-input";
import React, { useState, useEffect, useContext } from "react";
import background from "../../assets/background.png";
import avatar from "../../assets/avatar.png";
import app from "../../app.json";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";

import {
  AntDesign,
  Entypo,
  Feather,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import AuthContext from "../../contexts/auth";
import { Controller, useForm } from "react-hook-form";
import { useFocusEffect } from "@react-navigation/native";
import { Button } from "react-native-paper";

const Configuracoes: React.FC = ({ navigation }: any) => {
  const [show] = useState(false);
  const [screen, setScreen] = useState("basicos");
  const [editable, setEditable] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [conectado, setConectado] = useState<boolean | null>();
  const { user, signIn, signOutClearAll }: any = useContext(AuthContext);
  const {
    control,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useFocusEffect(
    React.useCallback(() => {
      // const unsubscribe = NetInfo.addEventListener((state) => {
      setConectado(true);
      // });
      // unsubscribe();

      setIsFocused(true);

      return () => {
        setIsFocused(false);
      };
    }, [])
  );

  const DadosBasicos = () => {
    return (
      <>
        <View
          style={{
            height: "60%",
            width: "80%",
            alignSelf: "center",
          }}
        >
          <Controller
            control={control}
            name="Nome"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={{ marginTop: 30 }}>
                <FloatingLabelInput
                  label={"Nome"}
                  maxLength={30}
                  hintTextColor={"white"}
                  containerStyles={{
                    height: 40,
                    marginTop: 10,
                    width: "100%",
                    borderColor: "white",
                    borderBottomWidth: 1,
                  }}
                  inputStyles={{
                    width: "100%",
                    fontSize: 20,
                    marginLeft: 10,
                    marginTop: 10,
                  }}
                  labelStyles={{ marginLeft: 5 }}
                  customLabelStyles={{
                    colorFocused: "white",
                    colorBlurred: "white",
                    fontSizeFocused: 12,
                  }}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  editable={editable}
                />
              </View>
            )}
          />

          <Controller
            control={control}
            name="Email"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={{ marginTop: 30 }}>
                <FloatingLabelInput
                  label={"E-mail"}
                  hintTextColor={"white"}
                  maxLength={160}
                  containerStyles={{
                    height: 40,
                    marginTop: 10,
                    width: "100%",
                    borderColor: "white",
                    borderBottomWidth: 1,
                  }}
                  inputStyles={{
                    width: "100%",
                    fontSize: 20,
                    marginLeft: 10,
                    marginTop: 10,
                  }}
                  labelStyles={{ marginLeft: 5 }}
                  customLabelStyles={{
                    colorFocused: "white",
                    colorBlurred: "white",
                    fontSizeFocused: 12,
                  }}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  editable={editable}
                />
              </View>
            )}
          />
          <Button
            style={{
              marginTop: 80,
              height: 60,
              justifyContent: "center",
              backgroundColor: "#F96D41",
            }}
            icon="content-save"
            mode="contained"
            onPress={() => console.log("Pressed")}
          >
            Salvar Dados
          </Button>
        </View>
      </>
    );
  };

  const AlterarSenha = () => {
    return (
      <>
        <View
          style={{
            height: "60%",
            width: "80%",
            alignSelf: "center",
          }}
        >
          <Controller
            control={control}
            name="SenhaAntiga"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={{ marginTop: 30 }}>
                <FloatingLabelInput
                  label={"Senha antiga"}
                  hintTextColor={"white"}
                  isPassword
                  togglePassword={show}
                  customShowPasswordComponent={
                    <Feather name="eye-off" size={24} color="#E7E7E7" />
                  }
                  customHidePasswordComponent={
                    <Feather name="eye" size={24} color="#E7E7E7" />
                  }
                  containerStyles={{
                    height: 40,
                    marginTop: 10,
                    width: "100%",
                    borderColor: "white",
                    borderBottomWidth: 1,
                  }}
                  inputStyles={{
                    width: "100%",
                    fontSize: 20,
                    marginLeft: 10,
                    marginTop: 10,
                  }}
                  labelStyles={{ marginLeft: 5 }}
                  customLabelStyles={{
                    colorFocused: "white",
                    colorBlurred: "white",
                    fontSizeFocused: 12,
                  }}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              </View>
            )}
          />
          {errors.SenhaAntiga && <Text>Informe a senha atual.</Text>}

          <Controller
            control={control}
            name="NovaSenha"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={{ marginTop: 30 }}>
                <FloatingLabelInput
                  label={"Nova senha"}
                  hintTextColor={"white"}
                  isPassword
                  togglePassword={show}
                  customShowPasswordComponent={
                    <Feather name="eye-off" size={24} color="#E7E7E7" />
                  }
                  customHidePasswordComponent={
                    <Feather name="eye" size={24} color="#E7E7E7" />
                  }
                  containerStyles={{
                    height: 40,
                    marginTop: 10,
                    width: "100%",
                    borderColor: "white",
                    borderBottomWidth: 1,
                  }}
                  inputStyles={{
                    width: "100%",
                    fontSize: 20,
                    marginLeft: 10,
                    marginTop: 10,
                  }}
                  labelStyles={{ marginLeft: 5 }}
                  customLabelStyles={{
                    colorFocused: "white",
                    colorBlurred: "white",
                    fontSizeFocused: 12,
                  }}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              </View>
            )}
          />
          {errors.NovaSenha && <Text>Informe a nova senha.</Text>}

          <Controller
            control={control}
            name="ConfirmarNovaSenha"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={{ marginTop: 30 }}>
                <FloatingLabelInput
                  label={"Confirmar Nova senha"}
                  hintTextColor={"white"}
                  isPassword
                  togglePassword={show}
                  customShowPasswordComponent={
                    <Feather name="eye-off" size={24} color="#E7E7E7" />
                  }
                  customHidePasswordComponent={
                    <Feather name="eye" size={24} color="#E7E7E7" />
                  }
                  containerStyles={{
                    height: 40,
                    marginTop: 10,
                    width: "100%",
                    borderColor: "white",
                    borderBottomWidth: 1,
                  }}
                  inputStyles={{
                    width: "100%",
                    fontSize: 20,
                    marginLeft: 10,
                    marginTop: 10,
                  }}
                  labelStyles={{ marginLeft: 5 }}
                  customLabelStyles={{
                    colorFocused: "white",
                    colorBlurred: "white",
                    fontSizeFocused: 12,
                  }}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              </View>
            )}
          />
          {errors.ConfirmarNovaSenha && (
            <Text>Confirmação da nova senha necessária.</Text>
          )}
          <Button
            style={{
              marginTop: 80,
              height: 60,
              justifyContent: "center",
              backgroundColor: "#F96D41",
            }}
            icon="content-save"
            mode="contained"
            onPress={() => console.log("Pressed")}
          >
            Salvar Dados
          </Button>
        </View>
      </>
    );
  };

  const Informacoes = () => {
    return (
      <>
        <View
          style={{
            backgroundColor: "rgba(29, 29, 29, 0.9)",
            padding: 5,
            borderRadius: 10,
            marginTop: 5,
            minHeight: 120,
            width: "85%",
            display: "flex",
            alignSelf: "center",
          }}
        >
          <View
            style={{
              height: 50,
              width: "100%",
              flexDirection: "row",
              borderBottomColor: "rgba(100, 103, 109, 0.2)",
              borderBottomWidth: 1,
            }}
          >
            <Octicons
              name="versions"
              style={{
                position: "absolute",
                marginTop: 5,
                marginLeft: 10,
              }}
              size={30}
              color="white"
            />
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                flex: 2.5,
                color: "white",
                paddingTop: 5,
                textAlign: "center",
              }}
            >
              Versão do App
            </Text>
          </View>
          <View
            style={{
              marginTop: -5,
              height: 50,
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 24,
                marginTop: 15,
                flex: 1,
                textAlign: "center",
                color: "white",
              }}
            >
              {app.expo.version}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: "rgba(29, 29, 29, 0.9)",
            padding: 5,
            borderRadius: 10,
            marginTop: 5,
            minHeight: 80,
            width: "85%",
            display: "flex",
            alignSelf: "center",
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => {
            signOutClearAll();
          }}
        >
          <Ionicons
            name="ios-exit-outline"
            style={{
              position: "absolute",
              marginTop: 5,
              marginLeft: 10,
            }}
            size={30}
            color="white"
          />

          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              flex: 2.5,
              color: "white",
              paddingTop: 5,
              textAlign: "center",
            }}
          >
            Encerrar Sessão
          </Text>
        </TouchableOpacity>

        <View
          style={{
            backgroundColor: "rgba(29, 29, 29, 0.9)",
            padding: 5,
            borderRadius: 10,
            marginTop: 5,
            minHeight: 80,
            width: "85%",
            display: "flex",
            alignSelf: "center",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MaterialIcons
            name="cleaning-services"
            style={{
              position: "absolute",
              marginTop: 5,
              marginLeft: 10,
            }}
            size={30}
            color="white"
          />

          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              flex: 2.5,
              color: "white",
              paddingTop: 5,
              textAlign: "center",
            }}
          >
            Limpar Cache
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "rgba(29, 29, 29, 0.9)",
            padding: 5,
            borderRadius: 10,
            marginTop: 5,
            minHeight: 80,
            width: "85%",
            display: "flex",
            alignSelf: "center",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Entypo
            name="trash"
            style={{
              position: "absolute",
              marginTop: 5,
              marginLeft: 10,
            }}
            size={30}
            color="white"
          />

          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              flex: 2.5,
              color: "white",
              paddingTop: 5,
              textAlign: "center",
            }}
          >
            Excluir Conta
          </Text>
        </View>
      </>
    );
  };

  function renderMenu() {
    return (
      <View
        style={{
          position: "absolute",
          flexDirection: "row",
          display: "flex",
          width: "100%",
          height: 50,
          bottom: "0%",
          borderTopColor: "rgba(100, 103, 109, 0.2)",
          borderTopWidth: 1,
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            height: 70,
            alignItems: "center",
            marginTop: 12,
          }}
          onPress={() => {
            navigation.navigate("Dashboard");
          }}
        >
          <MaterialCommunityIcons
            name="view-dashboard"
            size={28}
            color="#64676D"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            height: 70,
            alignItems: "center",
            marginTop: 12,
          }}
          onPress={() => {
            setScreen("basicos");
          }}
        >
          <AntDesign
            name="user"
            size={30}
            color={screen == "basicos" ? "#E7E7E7" : "#64676D"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            height: 70,
            alignItems: "center",
            marginTop: 12,
          }}
          onPress={() => {
            setScreen("senha");
          }}
        >
          <Feather
            name="unlock"
            size={30}
            color={screen == "senha" ? "#E7E7E7" : "#64676D"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            height: 70,
            alignItems: "center",
            marginTop: 12,
          }}
          onPress={() => {
            setScreen("info");
          }}
        >
          <Feather
            name="info"
            size={30}
            color={screen == "info" ? "#E7E7E7" : "#64676D"}
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground style={{ flex: 1 }} source={background}>
        <ScrollView>
          <View
            style={{
              marginTop: "0%",
              height: 250,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Image
                source={avatar}
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 60,
                  borderWidth: 3,
                  backgroundColor: "grey",
                  borderColor: "rgba(100, 100, 100, 0.5)",
                }}
              />
              <View
                style={{
                  width: 139,
                  height: 30,
                  left: -25,
                  bottom: 10,
                  position: "absolute",
                }}
              >
                <TouchableOpacity
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    bottom: 0,
                    alignSelf: "flex-end",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#90BE6D",
                  }}
                >
                  <MaterialIcons name="add-a-photo" size={15} color="white" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ width: "50%", marginTop: 20 }}>
              {isFocused ? (
                <>
                  <Text
                    style={{
                      width: "100%",
                      fontSize: 26,
                      fontWeight: "bold",
                      textAlign: "center",
                      color: "white",
                      height: 35,
                    }}
                  >
                    {`${user?.nome.split(" ")[0]}` +
                      " " +
                      `${
                        user?.nome.split(" ")[1] ? user?.nome.split(" ")[1] : ""
                      }`}
                  </Text>
                </>
              ) : (
                <></>
              )}
            </View>
          </View>

          <View style={{ height: "80%", width: "100%", paddingBottom: 100 }}>
            {isFocused ? (
              conectado ? (
                screen == "basicos" ? (
                  <DadosBasicos />
                ) : screen == "senha" ? (
                  <AlterarSenha />
                ) : screen == "info" ? (
                  <Informacoes />
                ) : (
                  <></>
                )
              ) : (
                <View
                  style={{
                    display: "flex",
                    backgroundColor: "white",
                    marginTop: 200,
                    width: "100%",
                    height: 100,
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Feather name="wifi-off" size={100} color="white" />
                  <Text style={{ color: "white", marginTop: 20, fontSize: 16 }}>
                    Sem conexão.
                  </Text>
                </View>
              )
            ) : (
              <ActivityIndicator
                size={100}
                color="white"
                style={{ alignSelf: "center", marginTop: 150 }}
              />
            )}
          </View>
        </ScrollView>
        {renderMenu()}
      </ImageBackground>
    </View>
  );
};

export default Configuracoes;
