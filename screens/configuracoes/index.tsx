import React, { useState, useEffect, useContext } from "react";
import background from "../../assets/background.png";
import { FloatingLabelInput } from "react-native-floating-label-input";
import { BoxShadow } from "react-native-shadow";
import avatar from "../../assets/avatar.png";
import app from "../../app.json";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import {
  AdicionarFoto,
  BotaoAdicionarFoto,
  Container,
  Conteudo,
  Form,
  Foto,
  Fundo,
  HeaderExtrato,
  ImageView,
  Info,
  InfoExtrato,
  InfoText,
  InfoView,
  InputBox,
  ScreenButtom,
  TitleUser,
} from "./style";

import {
  MaterialIcons,
  AntDesign,
  Feather,
  Octicons,
} from "@expo/vector-icons";
import AuthContext from "../../contexts/auth";
import { Controller, useForm } from "react-hook-form";
import { useFocusEffect } from "@react-navigation/native";

const Configuracoes: React.FC = ({ navigation }: any) => {
  const [show] = useState(false);
  const { user, signIn, signOut } = useContext(AuthContext);
  const [screen, setScreen] = useState("basicos");
  const [editable, setEditable] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [conectado, setConectado] = useState<boolean | null>();
  const {
    control,
    handleSubmit,
    setValue,
    reset,
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

  function renderHeader(profile: any) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          paddingHorizontal: 24,
          alignItems: "center",
        }}
      ></View>
    );
  }

  function renderButtonSection() {
    return (
      <View style={{ flex: 1, justifyContent: "center", padding: 24 }}>
        <View
          style={{
            flexDirection: "row",
            height: 70,
            backgroundColor: "#25282F",
            borderRadius: 12,
          }}
        ></View>
      </View>
    );
  }

  const DadosBasicos = () => {
    return (
      <>
        <Form>
          <Controller
            control={control}
            name="Nome"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputBox>
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
              </InputBox>
            )}
          />

          <Controller
            control={control}
            name="Email"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputBox>
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
              </InputBox>
            )}
          />
        </Form>
      </>
    );
  };

  const AlterarSenha = () => {
    return (
      <>
        <Form>
          <InputBox>
            <Controller
              control={control}
              name="SenhaAntiga"
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
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
              )}
            />
            {errors.SenhaAntiga && <Text>Informe a senha atual.</Text>}
          </InputBox>

          <InputBox>
            <Controller
              control={control}
              name="NovaSenha"
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
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
              )}
            />
            {errors.NovaSenha && <Text>Informe a nova senha.</Text>}
          </InputBox>

          <InputBox>
            <Controller
              control={control}
              name="ConfirmarNovaSenha"
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
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
              )}
            />
            {errors.ConfirmarNovaSenha && (
              <Text>Confirmação da nova senha necessária.</Text>
            )}
          </InputBox>
        </Form>
      </>
    );
  };

  const Informacoes = () => {
    return (
      <>
        <View style={{ marginTop: 100 }} />
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
          <HeaderExtrato>
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
          </HeaderExtrato>
          <InfoExtrato>
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
          </InfoExtrato>
        </View>
      </>
    );
  };

  return (
    <Container>
      <Fundo source={background}>
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
            <ImageView>
              <Foto source={avatar} />
              {/* <AdicionarFoto>
                <BotaoAdicionarFoto>
                  <MaterialIcons name="add-a-photo" size={15} color="white" />
                </BotaoAdicionarFoto>
              </AdicionarFoto> */}
            </ImageView>

            <Info>
              {isFocused ? (
                <>
                  <TitleUser>
                    {`${user?.nome.split(" ")[0]}` +
                      " " +
                      `${
                        user?.nome.split(" ")[1] ? user?.nome.split(" ")[1] : ""
                      }`}
                  </TitleUser>
                </>
              ) : (
                <></>
              )}
            </Info>
          </View>

          <Conteudo>
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
                <InfoView>
                  <Feather name="wifi-off" size={100} color="white" />
                  <InfoText>Sem conexão.</InfoText>
                </InfoView>
              )
            ) : (
              <ActivityIndicator
                size={100}
                color="white"
                style={{ alignSelf: "center", marginTop: 150 }}
              />
            )}
          </Conteudo>
        </ScrollView>

        <View
          style={{
            position: "absolute",
            flexDirection: "row",
            display: "flex",
            width: "100%",
            height: 80,
            bottom: "0%",
            backgroundColor: "#000000",
          }}
        >
          <ScreenButtom
            onPress={() => {
              navigation.navigate("Dashboard");
              setEditable(false);
            }}
          >
            <AntDesign name="home" size={30} color={"#E7E7E7"} />
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={{
                color: "#E7E7E7",
              }}
            >
              Home
            </Text>
          </ScreenButtom>

          <ScreenButtom
            onPress={() => {
              setScreen("basicos");
              setEditable(false);
            }}
          >
            <AntDesign
              name="user"
              size={30}
              color={screen == "basicos" ? "#BA8C63" : "#E7E7E7"}
            />
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={{
                color: screen == "basicos" ? "#BA8C63" : "#E7E7E7",
              }}
            >
              Perfil
            </Text>
          </ScreenButtom>

          <ScreenButtom
            onPress={() => {
              setScreen("senha");
              setEditable(false);
            }}
          >
            <Feather
              name="unlock"
              size={30}
              color={screen == "senha" ? "#BA8C63" : "#E7E7E7"}
            />
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={{
                color: screen == "senha" ? "#BA8C63" : "#E7E7E7",
              }}
            >
              Alterar senha
            </Text>
          </ScreenButtom>

          <ScreenButtom
            onPress={() => {
              setScreen("info");
              setEditable(false);
            }}
          >
            <Feather
              name="info"
              size={30}
              color={screen == "info" ? "#BA8C63" : "#E7E7E7"}
            />
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={{
                color: screen == "info" ? "#BA8C63" : "#E7E7E7",
              }}
            >
              Versão
            </Text>
          </ScreenButtom>
        </View>
      </Fundo>
    </Container>
  );
};

export default Configuracoes;

const styles = StyleSheet.create({
  shadowBox: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
