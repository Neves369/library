import React, { useState, useEffect, useContext } from "react";
import Moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useForm, Controller } from "react-hook-form";
import { VerificaCPF } from "../../../utils/ValidarCPF";
import Background from "../../../assets/background.png";
import LottieView from "lottie-react-native";
import {
  TouchableWithoutFeedback,
  View,
  Keyboard,
  Dimensions,
  StyleSheet,
} from "react-native";
import {
  Conteudo,
  Container,
  InputView,
  TextRegister,
  ButtonLogin,
  TextButton,
  LoginText,
  TextInput,
  Fundo,
  ButtonModal,
  DividerModal,
} from "./style";
import {
  ActivityIndicator,
  Card,
  Divider,
  Modal,
  Paragraph,
  Portal,
  Text,
  Title,
  useTheme,
} from "react-native-paper";
import {
  MaterialCommunityIcons,
  AntDesign,
  Foundation,
  Entypo,
} from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import {getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import fb from "../../../config";
import AuthContext from "../../../contexts/auth";
import { TextInputMask } from "react-native-masked-text";

const Cadastrar: React.FC = ({ navigation }: any) => {
  const { colors } = useTheme();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [userInfo, setUserInfo] = useState();
  const { signIn } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [screen, setScreen] = useState("básicos");
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const hideModal = () => setVisible(false);

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

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>
        <View style={{ flex: 1 }}>
          <Fundo source={Background} resizeMode="stretch" />
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
        {screen == "básicos" ? (
          <Conteudo>
            <LoginText
              style={{
                color: colors.text,
              }}
            >
              Cadastrar
            </LoginText>

            <Controller
              control={control}
              name="Email"
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputView>
                  <Entypo
                  name="email"
                  size={24}
                  color="#5352A0"
                  style={styles.inputIcon}
                />
                 <TextInput
                  placeholder="E-mail"
                  label={"E-mail"}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  maxLength={60}
                  onBlur={onBlur}
                  onChangeText={(value: any) => onChange(value)}
                  value={value}
                />
                </InputView>
              )}
            />
            {errors.Email && <Text>E-mail é obrigatório.</Text>}

            <Controller
              control={control}
              name="DataNascimento"
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputView>
                  <MaterialCommunityIcons
                    name="calendar-month"
                    size={24}
                    color="#5352A0"
                    style={styles.inputIcon}
                  />
                  <TextInputMask
                    style={{
                      color: colors.text,
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
                </InputView>
              )}
            />
            {errors.DataNascimento && (
              <Text>Data de nascimento é obrigatório.</Text>
            )}

            <ButtonLogin
              onPress={handleSubmit(changeScreen)}
              style={{
                backgroundColor: "#5352A0",
              }}
            >
              <TextButton
                style={{
                  color: "white",
                }}
              >
                Próximo
              </TextButton>
            </ButtonLogin>
            <TextRegister
              style={{
                color: colors.text,
              }}
            >
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
            </TextRegister>
          </Conteudo>
        ) : (
          <Conteudo>
            <LoginText
              style={{
                color: colors.text,
              }}
            >
              Cadastrar
            </LoginText>

            <Controller
              control={control}
              name="Senha"
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputView>
                  <Entypo
                    style={styles.inputIcon}
                    name="lock"
                    size={24}
                    color="#5352A0"
                  />
                  <TextInput
                    placeholder="Senha"
                    label={"Senha"}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    maxLength={12}
                    onBlur={onBlur}
                    onChangeText={(value: any) => onChange(value)}
                    value={value}
                  />
                </InputView>
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
                <InputView>
                  <Entypo
                    style={styles.inputIcon}
                    name="lock"
                    size={24}
                    color="#5352A0"
                  />
                  <TextInput
                    placeholder="Confirmar senha"
                    label={"Confirmar_Senha"}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    maxLength={60}
                    onBlur={onBlur}
                    onChangeText={(value: any) => onChange(value)}
                    value={value}
                  />
                </InputView>
              )}
            />
            {errors.Confirmar_Senha && (
              <Text style={{ color: colors.error }}>
                A confirmação da senha é obrigatória.
              </Text>
            )}

            <ButtonLogin
              onPress={handleSubmit(handleCadastrar)}
              style={{
                backgroundColor: "#5352A0",
              }}
            >
              {loading ? (
                <ActivityIndicator animating={true} color={colors.text2} />
              ) : (
                <TextButton
                  style={{
                    color: "white",
                  }}
                >
                  Cadastrar
                </TextButton>
              )}
            </ButtonLogin>
            <TextRegister
              style={{
                color: colors.text,
              }}
            >
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
            </TextRegister>
          </Conteudo>
        )}
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={{ padding: 20 }}
          >
            <Card style={styles.iosCard}>
              <Card.Content>
                <Title style={styles.titleCard}>{title}</Title>
                <Paragraph style={styles.textCard}>{message}</Paragraph>
              </Card.Content>
              <DividerModal />
              <Card.Actions>
                <ButtonModal onPress={() => setVisible(false)}>
                  <Text
                    style={{
                      color: colors.error,
                    }}
                  >
                    Fechar
                  </Text>
                </ButtonModal>
              </Card.Actions>
            </Card>
          </Modal>
        </Portal>
      </Container>
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
  iosCard: {
    backgroundColor: "rgba(230, 230, 230, 0.9)",
    elevation: 0,
    borderRadius: 15,
  },
  titleCard: {
    textAlign: "center",
  },
  textCard: {
    minHeight: 50,
    textAlign: "center",
  },
});
