import pageFilledIcon from "../../assets/icons/page_filled_icon.png";
import React, { useState, useEffect, useContext } from "react";
import bookmarkIcon from "../../assets/icons/mark_icon.png";
import readIcon from "../../assets/icons/read_icon.png";
import background from "../../assets/background.png";

import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import {
  Entypo,
  Ionicons,
  Fontisto,
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import AuthContext from "../../contexts/auth";
import bookService from "../../service/bookService";
import LoaderPage from "../../components/Loader/LoaderPage";
import LineDivider from "../../components/Divider/LineDivider";
import ArrayContains from "../../utils/ArrayContains";
import userService from "../../service/userService";
import Category from "../../components/Category";

const ListaLivros: React.FC = ({ route, navigation }: any) => {
  const [myBooks, setMyBooks] = useState([]);
  const [visible, setVisible] = useState(false);
  const { user, signIn, showMessage }: any = useContext(AuthContext);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    await bookService
      .getBooks({ categoria: route.params.categoria, token: user.token })
      .then((resp: any) => {
        setMyBooks(resp.data);
        setVisible(true);
      })
      .catch(() => {
        setVisible(true);
      });
  };

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

  function renderHeader() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          paddingHorizontal: 24,
          alignItems: "center",
        }}
      >
        {/* Greetings */}
        <View style={{ flex: 1 }}>
          <View style={{ marginRight: 24 }}>
            <Text
              style={{
                color: "#E7E7E7",
                fontSize: 16,
                lineHeight: 22,
                fontWeight: "700",
              }}
            >
              BEM VINDO
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 24,
                lineHeight: 30,
                fontWeight: "900",
              }}
            >
              {user.nome}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            height: 80,
            width: 90,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialIcons name="menu-book" size={50} color="white" />
            <Text style={{ color: "white", fontWeight: "bold" }}>Litterae</Text>
          </View>
        </TouchableOpacity>
      </View>
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
        >
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 10,
            }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="return-down-back-sharp" size={24} color="white" />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 16,
                  lineHeight: 22,
                  color: "#E7E7E7",
                }}
              >
                Retornar
              </Text>
            </View>
          </TouchableOpacity>

          <LineDivider>
            {/* <View
              style={{
                flex: 1,
                borderLeftColor: "#64676D",
                borderLeftWidth: 1,
              }}
            ></View> */}
          </LineDivider>

          {/* Get Point */}
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 10,
            }}
            onPress={() => {
              navigation.navigate("Categorias");
            }}
          >
            <FontAwesome name="folder-open" size={24} color="white" />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, lineHeight: 22, color: "#E7E7E7" }}>
                Categorias
              </Text>
            </View>
          </TouchableOpacity>

          {/* Divider */}
          <LineDivider>
            {/* <View
              style={{
                flex: 1,
                borderLeftColor: "#64676D",
                borderLeftWidth: 1,
              }}
            ></View> */}
          </LineDivider>

          {/* My Card */}
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 10,
            }}
            onPress={() => {
              showMessage("Esta função ainda não está disponível");
            }}
          >
            <FontAwesome5 name="dice" size={24} color="white" />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, lineHeight: 22, color: "#E7E7E7" }}>
                Sugestão
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderCategoryData() {
    const renderItem = ({ item }: any) => {
      return (
        <View style={{ marginVertical: 8 }}>
          <TouchableOpacity
            style={{ flex: 1, flexDirection: "row" }}
            onPress={() =>
              navigation.navigate("Detalhes", {
                book: item,
              })
            }
          >
            {/* Book Cover */}
            <Image
              source={{ uri: `data:image/gif;base64,${item.capa}` }}
              resizeMode="cover"
              style={{ width: 100, height: 150, borderRadius: 10 }}
            />

            <View style={{ flex: 1, marginLeft: 12 }}>
              {/* Book name and author */}
              <View>
                <Text
                  numberOfLines={1}
                  style={{
                    paddingRight: 24,
                    fontSize: 22,
                    lineHeight: 30,
                    color: "#E7E7E7",
                    width: 210,
                  }}
                >
                  {item.nome}
                </Text>
                <Text
                  style={{ fontSize: 16, lineHeight: 22, color: "#64676D" }}
                >
                  {item.autor}
                </Text>
              </View>

              {/* Book Info */}
              <View style={{ flexDirection: "row", marginTop: 12 }}>
                <Image
                  source={pageFilledIcon}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: "#64676D",
                  }}
                />
                <Text
                  style={{
                    fontSize: 14,
                    lineHeight: 22,
                    color: "#64676D",
                    paddingHorizontal: 12,
                  }}
                >
                  {item.numeroPaginas}
                </Text>
                <Image
                  source={readIcon}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: "#64676D",
                  }}
                />
                <Text
                  style={{
                    fontSize: 14,
                    lineHeight: 22,
                    color: "#64676D",
                    paddingHorizontal: 12,
                  }}
                >
                  {item.vezesLidas}
                </Text>
              </View>

              {/* Genre */}
              <View style={{ flexDirection: "row", marginTop: 8 }}>
                {Category(item)}
              </View>
            </View>
          </TouchableOpacity>

          {/* Bookmark Button */}
          <TouchableOpacity
            style={{ position: "absolute", top: 5, right: 15 }}
            onPress={() => {
              saveInFavorites(item._id);
            }}
          >
            {ArrayContains.string(user.favoritos, item._id) ? (
              <FontAwesome name="bookmark" size={30} color="white" />
            ) : (
              <FontAwesome name="bookmark-o" size={30} color="#64676D" />
            )}
          </TouchableOpacity>
        </View>
      );
    };

    return (
      <View style={{ flex: 1, marginTop: 12, paddingLeft: 24 }}>
        <FlatList
          data={myBooks}
          renderItem={renderItem}
          keyExtractor={(item: any) => `${item._id}`}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }

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
        >
          <MaterialCommunityIcons
            name="view-dashboard"
            size={28}
            color="#E7E7E7"
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
            showMessage("Esta função ainda não está disponível");
          }}
        >
          <FontAwesome name="search" size={28} color="#64676D" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            height: 70,
            alignItems: "center",
            marginTop: 12,
          }}
          onPress={() => {
            showMessage("Esta função ainda não está disponível");
          }}
        >
          <Fontisto name="world-o" size={28} color="#64676D" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            height: 70,
            alignItems: "center",
            marginTop: 12,
          }}
          onPress={() => {
            navigation.navigate("Configuracoes");
          }}
        >
          <Entypo name="menu" size={28} color="#64676D" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground style={{ flex: 1 }} source={background}>
        <View style={{ height: 200, marginTop: 50 }}>
          {renderHeader()}
          {renderButtonSection()}
        </View>

        <ScrollView style={{ marginTop: 12, marginBottom: 50 }}>
          <View>
            {myBooks.length > 0 ? <View>{renderCategoryData()}</View> : <></>}
          </View>
        </ScrollView>
        {renderMenu()}
        {visible ? <></> : <LoaderPage />}
      </ImageBackground>
    </View>
  );
};

export default ListaLivros;
