import React, { useState, useEffect, useContext } from "react";
import pageFilledIcon from "../../assets/icons/page_filled_icon.png";
import bookmarkIcon from "../../assets/icons/mark_icon.png";
import readIcon from "../../assets/icons/read_icon.png";
import background from "../../assets/background.png";
import easteregg from "../../assets/easteregg.gif";
import Books from "../../Books.json";
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
  FontAwesome5,
  Foundation,
  AntDesign,
} from "@expo/vector-icons";
import AuthContext from "../../contexts/auth";

const Dashboard: React.FC = ({ navigation }: any) => {
  const profileData = {
    name: "Usuário Teste",
    point: 200,
  };

  const bookOtherWordsForHome = {
    id: 1,
    bookName: "Other Words For Home",
    bookCover: require("../../assets/images/1.jpg"),
    rating: 4.5,
    language: "Eng",
    pageNo: 341,
    author: "Jasmine Warga",
    genre: ["Romance", "Adventure", "Drama"],
    readed: "12k",
    description:
      "Jude never thought she’d be leaving her beloved older brother and father behind, all the way across the ocean in Syria. But when things in her hometown start becoming volatile, Jude and her mother are sent to live in Cincinnati with relatives. At first, everything in America seems too fast and too loud. The American movies that Jude has always loved haven’t quite prepared her for starting school in the US—and her new label of 'Middle Eastern,' an identity she’s never known before. But this life also brings unexpected surprises—there are new friends, a whole new family, and a school musical that Jude might just try out for. Maybe America, too, is a place where Jude can be seen as she really is.",
  };

  const bookTheMetropolis = {
    id: 2,
    bookName: "The Metropolis",
    bookCover: require("../../assets/images/2.jpg"),
    rating: 4.1,
    language: "Eng",
    pageNo: 272,
    author: "Seith Fried",
    genre: ["Adventure", "Drama"],
    readed: "13k",
    description:
      "In Metropolis, the gleaming city of tomorrow, the dream of the great American city has been achieved. But all that is about to change, unless a neurotic, rule-following bureaucrat and an irreverent, freewheeling artificial intelligence can save the city from a mysterious terrorist plot that threatens its very existence. Henry Thompson has dedicated his life to improving America's infrastructure as a proud employee of the United States Municipal Survey. So when the agency comes under attack, he dutifully accepts his unexpected mission to visit Metropolis looking for answers. But his plans to investigate quietly, quickly, and carefully are interrupted by his new partner: a day-drinking know-it-all named OWEN, who also turns out to be the projected embodiment of the agency's supercomputer. Soon, Henry and OWEN are fighting to save not only their own lives and those of the city's millions of inhabitants, but also the soul of Metropolis. The Municipalists is a thrilling, funny, and touching adventure story, a tour-de-force of imagination that trenchantly explores our relationships to the cities around us and the technologies guiding us into the future.",
  };

  const bookTheTinyDragon = {
    id: 3,
    bookName: "The Tiny Dragon",
    bookCover: require("../../assets/images/3.jpg"),
    rating: 3.5,
    language: "Eng",
    pageNo: 110,
    author: "Ana C Bouvier",
    genre: ["Drama", "Adventure", "Romance"],
    readed: "13k",
    description:
      "This sketchbook for kids is the perfect tool to improve your drawing skills! Designed to encourage kids around the world to express their uniqueness through drawing, sketching or doodling, this sketch book is filled with 110 high quality blank pages for creations. Add some fun markers, crayons, and art supplies and you have the perfect, easy gift for kids!",
  };

  const myBooksData = [
    {
      ...bookOtherWordsForHome,
      completion: "75%",
      lastRead: "3d 5h",
    },
    {
      ...bookTheMetropolis,
      completion: "23%",
      lastRead: "10d 5h",
    },
    {
      ...bookTheTinyDragon,
      completion: "10%",
      lastRead: "1d 2h",
    },
  ];

  const categoriesData = [
    {
      id: 1,
      categoryName: "Best Seller",
      books: [bookOtherWordsForHome, bookTheMetropolis, bookTheTinyDragon],
    },
    {
      id: 2,
      categoryName: "Clássicos",
      books: [bookTheMetropolis],
    },
    {
      id: 3,
      categoryName: "Lançamentos",
      books: [bookTheTinyDragon],
    },
  ];

  const [visible, setVisible] = useState(false);
  const [profile, setProfile] = useState(profileData);
  const [myBooks, setMyBooks] = useState(Books.books);
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [categories, setCategories] = useState(categoriesData);
  const { user, signIn, changeLogando, signOut } = useContext(AuthContext);

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
          {/* Claim */}
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 10,
            }}
            onPress={() => console.log("Claim")}
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
            onPress={() => console.log("Get Point")}
          >
            <Foundation name="page-multiple" size={24} color="white" />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, lineHeight: 22, color: "#E7E7E7" }}>
                Todos
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

  function renderMyBookSection(myBooks: any) {
    const renderItem = ({ item, index }: any) => {
      return (
        <TouchableOpacity
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
          <Image
            source={{ uri: `data:image/gif;base64,${item.capa}` }}
            resizeMode="cover"
            style={{
              width: 180,
              height: 250,
              borderRadius: 20,
            }}
          />
          <View style={{ marginTop: 10 }} />
        </TouchableOpacity>
      );
    };

    return (
      <View style={{ flex: 1 }}>
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

          <TouchableOpacity onPress={() => console.log("See More")}>
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
            keyExtractor={(item) => `${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }

  function renderCategoryHeader() {
    const renderItem = ({ item }: any) => {
      return (
        <TouchableOpacity
          style={{ flex: 1, marginRight: 24 }}
          onPress={() => setSelectedCategory(item.id)}
        >
          {selectedCategory == item.id && (
            <Text style={{ fontSize: 22, lineHeight: 30, color: "#E7E7E7" }}>
              {item.categoryName}
            </Text>
          )}
          {selectedCategory != item.id && (
            <Text style={{ fontSize: 22, lineHeight: 30, color: "#64676D" }}>
              {item.categoryName}
            </Text>
          )}
        </TouchableOpacity>
      );
    };

    return (
      <View style={{ flex: 1, paddingLeft: 24 }}>
        <FlatList
          data={categories}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
          horizontal
        />
      </View>
    );
  }

  function renderCategoryData() {
    var books: any = [];

    let selectedCategoryBooks = categories.filter(
      (a) => a.id == selectedCategory
    );

    if (selectedCategoryBooks.length > 0) {
      books = selectedCategoryBooks[0].books;
    }

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
              source={item.bookCover}
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
                  {item.bookName}
                </Text>
                <Text
                  style={{ fontSize: 16, lineHeight: 22, color: "#64676D" }}
                >
                  {item.author}
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
                  {item.pageNo}
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
                  {item.readed}
                </Text>
              </View>

              {/* Genre */}
              <View style={{ flexDirection: "row", marginTop: 8 }}>
                {item.genre.includes("Adventure") && (
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
                      Aventura
                    </Text>
                  </View>
                )}
                {item.genre.includes("Romance") && (
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
                      Romance
                    </Text>
                  </View>
                )}
                {item.genre.includes("Drama") && (
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
          data={books}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
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
          <View>{renderMyBookSection(myBooks)}</View>

          <View style={{ marginTop: 24 }}>
            <View>{renderCategoryHeader()}</View>

            <View>{renderCategoryData()}</View>
          </View>
        </ScrollView>

        <Menu>
          <ScreenButtom>
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

        <Modal animationType="slide" visible={visible} transparent={true}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              marginTop: 200,
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <View
              style={{
                width: 400,
                height: 100,
                // borderRadius: 20,
                backgroundColor: "white",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "black",
                  marginTop: 5,
                  fontSize: 20,
                  margin: 10,
                }}
              >
                É mano parece que você achou o easter egg, fique agora com a
                melhor luta do naruto clássico
              </Text>
            </View>
            <ImageBackground
              source={easteregg}
              style={{
                backgroundColor: "white",
                width: "100%",
                height: 300,
              }}
            />
            <TouchableOpacity
              onPress={() => {
                setVisible(false);
              }}
              style={{
                width: "100%",
                height: 80,
                backgroundColor: "red",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 22,
                }}
              >
                Fechar
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </Fundo>
    </Container>
  );
};

export default Dashboard;
