import React, { useState, useEffect, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import Background from "../../../assets/background.png";
import { AntDesign, Entypo } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import {
  TouchableWithoutFeedback,
  View,
  Keyboard,
  Dimensions,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import {
  Conteudo,
  Container,
  InputView,
  TextFp,
  TextRegister,
  ButtonLogin,
  TextButton,
  LoginText,
  TextInput,
  Fundo,
  ButtonModal,
  DividerModal,
} from "./style";
import * as Animatable from "react-native-animatable";
import AuthContext from "../../../contexts/auth";
// import LoginService from "../../../services/LoginService";
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
import { TextInputMask } from "react-native-masked-text";
// import checkVersion from "../../../utils/CheckStoreVersion";
// import config from "../../../api/config";

const Entrar: React.FC = ({ navigation }: any) => {
  const { colors } = useTheme();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const { user, signIn, changeLogando } = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const hideModal = () => setVisible(false);

  const handleLogin = async (data: any) => {
    signIn(null);
    // setLoading(true)
    // const ncpf = data.CPF.replace(/[^0-9]/g, '')
    // if (ncpf.length !== 11 || VerificaCPF(ncpf) == false) {
    //   return (
    //     setVisible(true),
    //     setTitle("CPF incorreto"),
    //     setMessage("Por favor insira o CPF corretamente")
    //   )
    // }
    // let user = {
    //   cpf: ncpf,
    //   senha: data.Senha
    // }
    // await LoginService.logar(user)
    // .then((resp: any)=>{
    //   ToastAndroid.show(resp.status, ToastAndroid.SHORT)
    //   if(resp.status == 200){
    //     setLoading(false)
    //     if (resp.data.length >= 2){
    //       navigation.navigate('EscolherSubContrato', resp.data);
    //     }
    //     else{
    //       changeLogando(true),
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
    //     setLoading(false),
    //     setTitle("Erro"),
    //     setMessage(resp.titulo),
    //     setVisible(true)
    //   )
    // })
  };

  const verifyUpdateStore = async () => {
    // try {
    //   const check = await checkVersion();
    //   if (check.result === "new") {
    //     setTimeout(() => {
    //       setUpdate(true);
    //     }, 2000);
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
  };

  useEffect(() => {
    verifyUpdateStore();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>
        <View style={{ flex: 1 }}>
          <Fundo resizeMode="stretch" source={Background} />
        </View>
        <Animatable.Text
          style={styles.titleText}
          animation="fadeInUp"
          delay={1200}
        >
          Teste
        </Animatable.Text>
        <LottieView
          speed={0.5}
          source={require("../../../assets/images/35235-reading.json")}
          autoPlay
          loop
          resizeMode="contain"
        />
        <Conteudo>
          <LoginText
            style={{
              color: colors.text,
            }}
          >
            Login
          </LoginText>
          <Controller
            control={control}
            name="CPF"
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
          {errors.CPF && (
            <Text style={{ color: colors.error }}>CPF é obrigatório.</Text>
          )}

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
                  secureTextEntry={true}
                  maxLength={12}
                  autoCapitalize="none"
                  onBlur={onBlur}
                  onChangeText={(value: any) => onChange(value)}
                  value={value}
                />
              </InputView>
            )}
          />
          {errors.Senha && (
            <Text style={{ color: "#5352A0" }}>Senha é obrigatória.</Text>
          )}
          <TextFp
            style={{
              color: "#edf2f4",
            }}
            onPress={() => {
              navigation.navigate("EsqueciASenha");
            }}
          >
            Esqueceu a senha?
          </TextFp>
          <ButtonLogin
            style={{
              backgroundColor: "#5352A0",
            }}
            onPress={handleSubmit(handleLogin)}
          >
            {loading ? (
              <ActivityIndicator animating={true} color="white" />
            ) : (
              <TextButton>Entrar</TextButton>
            )}
          </ButtonLogin>
          <TextRegister style={{ color: colors.text }}>
            Não possui um conta?
            <Text
              style={{ color: "#5352A0" }}
              onPress={() => {
                navigation.navigate("Cadastrar");
              }}
            >
              {" Registrar-se"}
            </Text>
          </TextRegister>
        </Conteudo>

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

        <Portal>
          <Modal
            visible={update}
            onDismiss={hideModal}
            contentContainerStyle={{ padding: 20 }}
          >
            <Card style={styles.iosCard}>
              <Card.Content>
                <Title style={styles.titleCard}>Atualização Disponível!</Title>
                <Paragraph style={[styles.textCard, { paddingHorizontal: 50 }]}>
                  Há uma atualização dísponível, deseja seguir para a loja?
                </Paragraph>
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
                <ButtonModal onPress={() => setVisible(false)}>
                  <Text
                    style={{
                      color: colors.primary,
                    }}
                  >
                    Ir para loja
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

export default Entrar;

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
