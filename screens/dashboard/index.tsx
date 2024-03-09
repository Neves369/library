import pageFilledIcon from "../../assets/icons/page_filled_icon.png";
import React, { useState, useContext, useCallback } from "react";
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
  Fontisto,
  Foundation,
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Codigo from "../../utils/Codigo";
import AuthContext from "../../contexts/auth";
import bookService from "../../service/bookService";
import userService from "../../service/userService";
import ArrayContains from "../../utils/ArrayContains";
import { useFocusEffect } from "@react-navigation/native";
import LoaderPage from "../../components/Loader/LoaderPage";
import LineDivider from "../../components/Divider/LineDivider";
import ImageBlurShadow from "../../components/ImageBlur/ImageBlurShadow";
import Category from "../../components/Category";

const Dashboard: React.FC = ({ navigation }: any) => {
  const listCategorias = [
    {
      id: 1,
      titulo: "Ficção",
      categoria: "ficcao",
    },
    {
      id: 2,
      titulo: "Romance",
      categoria: "romance",
    },
    {
      id: 3,
      titulo: "Religioso",
      categoria: "religioso",
    },
  ];

  const [myBooks, setMyBooks] = useState([]);
  const [visible, setVisible] = useState(false);
  const [initialBooks, setInitialBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [categorias, setCategorias] = useState(listCategorias);
  const { user, signIn, showMessage }: any = useContext(AuthContext);

  useFocusEffect(
    useCallback(() => {
      getBooks();
    }, [])
  );

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
          // onPress={() => signOutClearAll()}
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
          {/* Category */}
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 10,
            }}
            onPress={() => navigation.navigate("Categorias")}
          >
            <FontAwesome name="folder-open" size={24} color="white" />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 16,
                  lineHeight: 22,
                  color: "#E7E7E7",
                }}
              >
                Categorias
              </Text>
            </View>
          </TouchableOpacity>

          {/* Divider */}
          <LineDivider style={{ padding: 18 }} />

          {/* All books */}
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 10,
            }}
            onPress={() =>
              navigation.navigate("ListaLivros", { categoria: "ALL" })
            }
          >
            <Foundation name="page-multiple" size={24} color="white" />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, lineHeight: 22, color: "#E7E7E7" }}>
                Todos
              </Text>
            </View>
          </TouchableOpacity>

          {/* Divider */}
          <LineDivider style={{ padding: 18 }} />

          {/* Random */}
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

  function renderMyBookSection(myBooks: any) {
    const renderItem = ({ item, index }: any) => {
      return (
        <TouchableOpacity
          key={item.id}
          style={{
            flex: 1,
            marginLeft: index == 0 ? 24 : 0,
            marginRight: 12,
          }}
          onPress={() =>
            navigation.navigate("Detalhes", {
              book: item,
            })
          }
        >
          {/* Book Cover */}
          <ImageBlurShadow
            style={{
              justifyContent: "center",
              alignSelf: "center",
            }}
            source={{ uri: `data:image/gif;base64,${item.capa}` }}
            imageWidth={180}
            imageHeight={250}
            imageBorderRadius={22}
            shadowOffset={42}
            shadowBlurRadius={12}
            shadowBackgroundColor={"#000"}
          />
        </TouchableOpacity>
      );
    };

    return (
      <View
        style={{
          flex: 1,
          borderBottomColor: "rgba(100, 103, 109, 0.2)",
          borderBottomWidth: 1,
        }}
      >
        {/* Header */}
        <View
          style={{
            paddingHorizontal: 24,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 22, lineHeight: 30, color: "#E7E7E7" }}>
            Meus livros
          </Text>

          <TouchableOpacity onPress={() => {}}>
            <Text
              style={{
                fontSize: 16,
                lineHeight: 22,
                color: "#64676D",
                alignSelf: "flex-start",
                textDecorationLine: "underline",
              }}
            >
              ver mais
            </Text>
          </TouchableOpacity>
        </View>

        {/* Books */}
        <View style={{ flex: 1, marginTop: 24 }}>
          <FlatList
            data={myBooks}
            renderItem={renderItem}
            keyExtractor={(item, index) => String(index)}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }

  function renderCategoryHeader(categorias: any) {
    const renderItem = ({ item }: any) => {
      return (
        <TouchableOpacity
          style={{ flex: 1, marginRight: 24 }}
          onPress={() => setSelectedCategory(item.id)}
        >
          {selectedCategory == item.id && (
            <Text style={{ fontSize: 22, lineHeight: 30, color: "#E7E7E7" }}>
              {item.titulo}
            </Text>
          )}
          {selectedCategory != item.id && (
            <Text style={{ fontSize: 22, lineHeight: 30, color: "#64676D" }}>
              {item.titulo}
            </Text>
          )}
        </TouchableOpacity>
      );
    };

    return (
      <View style={{ flex: 1, paddingLeft: 24 }}>
        <FlatList
          data={categorias}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
          horizontal
        />
      </View>
    );
  }

  function renderCategoryData(initialBooks: any) {
    var books: any = [];

    let selectedCategoryBooks = categorias.filter(
      (a) => a.id == selectedCategory
    );

    if (selectedCategoryBooks.length > 0) {
      initialBooks.forEach((category: any) => {
        category.books.forEach((book: any) => {
          if (book.genero == selectedCategoryBooks[0].categoria) {
            books.push(book);
          }
        });
      });
    }

    const renderItem = ({ item, index }: any) => {
      return (
        <View style={{ marginVertical: 8 }} key={Codigo.gerar()}>
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
          data={books}
          renderItem={renderItem}
          keyExtractor={(item, index) => String(Codigo.gerar())}
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
          <Entypo
            name="menu"
            size={45}
            style={{ marginTop: -10 }}
            color="#64676D"
          />
        </TouchableOpacity>
      </View>
    );
  }

  async function getBooks() {
    await bookService
      .getBooksDashboard({
        favoritos: user,
        categorias: listCategorias,
        token: user.token,
      })
      .then((resp) => {
        setMyBooks(resp[0].data);
        setInitialBooks(resp[1].data);
        setVisible(true);
      })
      .catch(() => {
        setVisible(true);
      });
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
          getBooks();
        } else {
          showMessage(resp.Erro);
        }
      })
      .catch((resp: any) => {
        showMessage(resp);
      });
  }

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground style={{ flex: 1 }} source={background}>
        <View style={{ height: 200, marginTop: 50 }}>
          {renderHeader()}
          {renderButtonSection()}
        </View>

        <ScrollView style={{ marginTop: 12, marginBottom: 50 }}>
          {myBooks.length > 0 ? (
            <View>{renderMyBookSection(myBooks)}</View>
          ) : (
            <></>
          )}
          <View style={{ marginTop: 24 }}>
            {categorias.length > 0 ? (
              <View>{renderCategoryHeader(categorias)}</View>
            ) : (
              <></>
            )}
            {initialBooks.length > 0 ? (
              <View>{renderCategoryData(initialBooks)}</View>
            ) : (
              <></>
            )}
          </View>
        </ScrollView>
        {renderMenu()}
        {visible ? <></> : <LoaderPage />}
      </ImageBackground>
    </View>
  );
};

export default Dashboard;
