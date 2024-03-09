import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useContext } from "react";
import ReadPage from "../../components/Read/ReadPage";
import bookService from "../../service/bookService";
import {
  View,
  Text,
  Image,
  Animated,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import LineDivider from "../../components/Divider/LineDivider";
import ArrayContains from "../../utils/ArrayContains";
import userService from "../../service/userService";
import AuthContext from "../../contexts/auth";
import { Menu } from "react-native-paper";

const Detalhes = ({ route, navigation }: any) => {
  const indicator = new Animated.Value(0);
  const [showBook, setShowBook] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const [book, setBook] = useState<any>(route.params.book);
  const { user, signIn, showMessage }: any = useContext(AuthContext);
  const [scrollViewWholeHeight, setScrollViewWholeHeight] = useState(1);
  const [scrollViewVisibleHeight, setScrollViewVisibleHeight] = useState(0);

  useEffect(() => {
    if (book) {
      requestHeadersAWS(book);
    }
  }, [book]);

  async function requestHeadersAWS(book: any) {
    let headers = await bookService.getAuthHeader(
      book.ref,
      book._id,
      user.token
    );
    if (headers.data) {
      book.headers = headers.data;
    }
  }

  async function saveInFavorites(bookId: string) {
    if (ArrayContains.string(user.favoritos, bookId)) {
      user.favoritos = user.favoritos.filter((item: any) => item != bookId);
    } else {
      user.favoritos.push(bookId);
    }

    await userService
      .atualizarUser(user)
      .then((resp: any) => {
        if (resp.status == 200) {
          signIn(resp.data);
        } else {
          showMessage(resp.Erro);
        }
      })
      .catch((resp: any) => {
        showMessage(resp);
      });
  }

  function renderBookInfoSection() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={{ uri: `data:image/gif;base64,${book.capa}` }}
          resizeMode="cover"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        />

        {/* Color Overlay */}
        <View
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        ></View>

        {/* Navigation header */}
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 12,
            height: 80,
            alignItems: "flex-end",
          }}
        >
          <TouchableOpacity
            style={{ marginLeft: 8 }}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>

          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={{ fontSize: 22, lineHeight: 22, color: "white" }}>
              Detalhes
            </Text>
          </View>

          <Menu
            visible={visible}
            onDismiss={() => {
              setVisible(false);
            }}
            anchor={
              <TouchableOpacity
                onPress={() => {
                  setVisible(true);
                }}
              >
                <Feather name="more-horizontal" size={24} color="white" />
              </TouchableOpacity>
            }
          >
            <Menu.Item
              onPress={() => {
                showMessage("Esta função ainda não está disponível");
              }}
              leadingIcon="star"
              title="Avaliar livro"
            />
            <Menu.Item
              onPress={() => {
                showMessage("Esta função ainda não está disponível");
              }}
              leadingIcon="message"
              title="comentários"
            />
            <Menu.Item
              onPress={() => {
                removeProgress();
              }}
              leadingIcon="close"
              title="Apagar progresso"
            />
          </Menu>
        </View>

        {/* Book Cover */}
        <View style={{ flex: 5, paddingTop: 36, alignItems: "center" }}>
          <Image
            source={{ uri: `data:image/gif;base64,${book.capa}` }}
            resizeMode="contain"
            style={{
              flex: 1,
              width: 150,
              height: "auto",
            }}
          />
        </View>

        {/* Book Name and Author */}
        <View
          style={{ flex: 1.8, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontSize: 22, lineHeight: 30, color: "white" }}>
            {book.nome}
          </Text>
          <Text style={{ fontSize: 16, lineHeight: 22, color: "white" }}>
            {book.autor}
          </Text>
        </View>

        {/* Book Info */}
        <View
          style={{
            flexDirection: "row",
            paddingVertical: 20,
            margin: 24,
            borderRadius: 8,
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
        >
          {/* Rating */}
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ fontSize: 16, lineHeight: 22, color: "white" }}>
              {book.nota}
            </Text>
            <Text style={{ fontSize: 14, lineHeight: 22, color: "white" }}>
              Pontuação
            </Text>
          </View>

          <LineDivider />

          {/* Pages */}
          <View
            style={{ flex: 1, paddingHorizontal: 12, alignItems: "center" }}
          >
            <Text style={{ fontSize: 16, lineHeight: 22, color: "white" }}>
              {book.numeroPaginas}
            </Text>
            <Text style={{ fontSize: 14, lineHeight: 22, color: "white" }}>
              Páginas
            </Text>
          </View>

          <LineDivider />

          {/* Language */}
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ fontSize: 16, lineHeight: 22, color: "white" }}>
              {book.linguagem}
            </Text>
            <Text style={{ fontSize: 14, lineHeight: 22, color: "white" }}>
              Idioma
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function renderBookDescription() {
    const indicatorSize =
      scrollViewWholeHeight > scrollViewVisibleHeight
        ? (scrollViewVisibleHeight * scrollViewVisibleHeight) /
          scrollViewWholeHeight
        : scrollViewVisibleHeight;

    const difference =
      scrollViewVisibleHeight > indicatorSize
        ? scrollViewVisibleHeight - indicatorSize
        : 1;

    return (
      <View style={{ flex: 1, flexDirection: "row", padding: 24 }}>
        {/* Custom Scrollbar */}
        <View style={{ width: 4, height: "100%", backgroundColor: "#282C35" }}>
          <Animated.View
            style={{
              width: 4,
              height: indicatorSize,
              backgroundColor: "#7D7E84",
              transform: [
                {
                  translateY: Animated.multiply(
                    indicator,
                    scrollViewVisibleHeight / scrollViewWholeHeight
                  ).interpolate({
                    inputRange: [0, difference],
                    outputRange: [0, difference],
                    extrapolate: "clamp",
                  }),
                },
              ],
            }}
          />
        </View>

        {/* Description */}
        <ScrollView
          contentContainerStyle={{ paddingLeft: 24 }}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onContentSizeChange={(width, height) => {
            setScrollViewWholeHeight(height);
          }}
          onLayout={({
            nativeEvent: {
              layout: { x, y, width, height },
            },
          }) => {
            setScrollViewVisibleHeight(height);
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: indicator } } }],
            { useNativeDriver: false }
          )}
        >
          <Text
            style={{
              fontSize: 22,
              lineHeight: 30,
              color: "white",
              marginBottom: 12,
            }}
          >
            Descrição
          </Text>
          <Text style={{ fontSize: 20, lineHeight: 30, color: "#7D7E84" }}>
            {book.descricao}
          </Text>
        </ScrollView>
      </View>
    );
  }

  function renderBottomButton() {
    return (
      <View style={{ flex: 1, flexDirection: "row" }}>
        {/* Bookmark */}
        <TouchableOpacity
          style={{
            width: 60,
            backgroundColor: "#25282F",
            marginLeft: 24,
            marginVertical: 8,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            saveInFavorites(book._id);
          }}
        >
          {ArrayContains.string(user.favoritos, book._id) ? (
            <FontAwesome name="bookmark" size={30} color="white" />
          ) : (
            <FontAwesome name="bookmark-o" size={30} color="#64676D" />
          )}
        </TouchableOpacity>

        {/* Start Reading */}
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "#F96D41",
            marginHorizontal: 8,
            marginVertical: 8,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            setShowBook(true);
          }}
        >
          <Text style={{ fontSize: 16, lineHeight: 22, color: "white" }}>
            Começar a ler
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  async function removeProgress() {
    const keys = [
      book._id,
      `${book._id}font`,
      `${book._id}fontFamily`,
      `${book._id}theme`,
      `OfflineEpub${book.nome}`,
    ];
    await AsyncStorage.multiRemove(keys);
    showMessage("Progresso excluído com sucesso!");
  }

  if (book) {
    if (showBook) {
      return <ReadPage book={book} />;
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: "black" }}>
          {/* Book Cover Section */}
          <View style={{ flex: 4 }}>{renderBookInfoSection()}</View>

          {/* Description */}
          <View style={{ flex: 2 }}>{renderBookDescription()}</View>

          {/* Buttons */}
          <View style={{ height: 70, marginBottom: 10 }}>
            {renderBottomButton()}
          </View>
        </View>
      );
    }
  } else {
    return <></>;
  }
};

export default Detalhes;
