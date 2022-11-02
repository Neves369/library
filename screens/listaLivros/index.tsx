import React, { useState, useEffect, useContext } from "react";
import pageFilledIcon from "../../assets/icons/page_filled_icon.png";
import bookmarkIcon from "../../assets/icons/mark_icon.png";
import readIcon from "../../assets/icons/read_icon.png";
import background from "../../assets/background.png";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Modal,
  ImageBackground,
} from "react-native";

import {
  Container,
  Fundo,
  Header,
  LineDivider,
  Menu,
  ScreenButtom,
} from "./style";

import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
  Fontisto,
  Entypo,
  Ionicons,
  FontAwesome5
} from "@expo/vector-icons";
import AuthContext from "../../contexts/auth";
import bookService from "../../service/bookService";

const ListaLivros: React.FC = ({ navigation }: any) => {
  const profileData = {
    name: "Usuário Teste",
    point: 200,
  };

  const [books, setBooks] = useState([]);
  const [visible, setVisible] = useState(false);
  const [profile, setProfile] = useState(profileData);
  const [myBooks, setMyBooks] = useState([]);
  const { user, signIn, changeLogando, signOut } = useContext(AuthContext);


  useEffect(() => {
    getBooks()
  }, [])
  
  const getBooks = async() => {
    await bookService.getBooks().then((resp: any) => {
      if (resp.status == 200) {
        setMyBooks(resp.data);
      }
    });
  }

  function renderHeader(profile: any) {
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
                fontFamily: "Roboto_700Bold",
                color: "#E7E7E7",
                fontSize: 16,
                lineHeight: 22,
              }}
            >
              BEM VINDO
            </Text>
            <Text
              style={{
                fontFamily: "Roboto_700Bold",
                color: "white",
                fontSize: 24,
                lineHeight: 30,
              }}
            >
              {profile.name}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            // backgroundColor: 'red',
            height: 80,
            width: 90,
            justifyContent: "center",
            alignItems: "center",
          }}
          //   onPress={() => {
          //     setVisible(true);
          //   }}
          onPress={() => signOut()}
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
            onPress={() =>{navigation.navigate("Dashboard")}}
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
            <View
              style={{
                flex: 1,
                borderLeftColor: "#64676D",
                borderLeftWidth: 1,
              }}
            ></View>
          </LineDivider>

          {/* Get Point */}
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 10,
            }}
            onPress={() =>{navigation.navigate("Categorias")}}
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
            <View
              style={{
                flex: 1,
                borderLeftColor: "#64676D",
                borderLeftWidth: 1,
              }}
            ></View>
          </LineDivider>

          {/* My Card */}
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 10,
            }}
            onPress={() => console.log("My Card")}
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
              source={{uri: `data:image/gif;base64,${item.capa}`}}
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
                {item.genero.includes("ficcao") && (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 8,
                      marginRight: 8,
                      backgroundColor: "darkGreen",
                      height: 40,
                      borderRadius: 12,
                    }}
                  >
                    <Text
                      style={{ fontSize: 16, lineHeight: 22, color: "#424BAF" }}
                    >
                      Ficção
                    </Text>
                  </View>
                )}
                {item.genero.includes("religioso") && (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 8,
                      marginRight: 8,
                      backgroundColor: "darkRed",
                      height: 40,
                      borderRadius: 12,
                    }}
                  >
                    <Text
                      style={{ fontSize: 16, lineHeight: 22, color: "#424BAF" }}
                    >
                      Religioso
                    </Text>
                  </View>
                )}
                {item.genero.includes("Drama") && (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 8,
                      marginRight: 8,
                      backgroundColor: "darkBlue",
                      height: 40,
                      borderRadius: 12,
                    }}
                  >
                    <Text
                      style={{ fontSize: 16, lineHeight: 22, color: "#424BAF" }}
                    >
                      Drama
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>

          {/* Bookmark Button */}
          <TouchableOpacity
            style={{ position: "absolute", top: 5, right: 15 }}
            onPress={() => console.log("Bookmark")}
          >
            <Image
              source={bookmarkIcon}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: "#64676D",
              }}
            />
          </TouchableOpacity>
        </View>
      );
    };

    return (
      <View style={{ flex: 1, marginTop: 12, paddingLeft: 24 }}>
        <FlatList
          data={myBooks}
          renderItem={renderItem}
          keyExtractor={(item) => `${item._id}`}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }

  return (
    <Container>
      <Fundo source={background}>
        <Header>
          {renderHeader(profile)}
          {renderButtonSection()}
        </Header>

        <ScrollView style={{ marginTop: 12, marginBottom: 50 }}>
          <View>
            <View>{renderCategoryData()}</View>
          </View>
        </ScrollView>

        <Menu>
          <ScreenButtom
            onPress={()=>{navigation.navigate("Dashboard")}}
          >
            <MaterialCommunityIcons
              name="view-dashboard"
              size={28}
              color="#E7E7E7"
            />
          </ScreenButtom>

          <ScreenButtom>
            <FontAwesome name="search" size={28} color="#64676D" />
          </ScreenButtom>

          <ScreenButtom>
            <Fontisto name="world-o" size={28} color="#64676D" />
          </ScreenButtom>

          <ScreenButtom>
            <Entypo name="menu" size={28} color="#64676D" />
          </ScreenButtom>
        </Menu>
      </Fundo>
    </Container>
  );
};

export default ListaLivros;
