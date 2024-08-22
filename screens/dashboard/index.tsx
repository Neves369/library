import { useFileSystem } from "@epubjs-react-native/expo-file-system";
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
import { Reader } from "@epubjs-react-native/core";
import epubService from "../../service/epubService";
import { _arrayBufferToBase64 } from "../../utils/ToBase64";

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

  const { user, signIn, showMessage }: any = useContext(AuthContext);

  useFocusEffect(
    useCallback(() => {
      if (user.token) {
        getBooks();
      }
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
          onPress={() => {
            console.log(_arrayBufferToBase64(myBooks[0].conteudo.data));
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

  function renderMyBookSection(myBooks: any) {
    const renderItem = ({ item, index }: any) => {
      return (
        <TouchableOpacity
          key={item.id}
          style={{
            flex: 1,
            marginLeft: index == 0 ? 24 : 0,
            marginRight: 12,
            backgroundColor: "red",
            width: 150,
            height: 200,
          }}
          onPress={() =>
            navigation.navigate("Detalhes", {
              book: item,
            })
          }
        >
          <Reader
            enableSelection={false}
            // initialLocation={props.LastReadPage}
            src={`${_arrayBufferToBase64(item.conteudo.data)}`}
            // renderOpeningBookComponent={() => <LoaderBook />}
            fileSystem={useFileSystem}
            width={150}
            // renderLoadingFileComponent={() => <LoaderBook />}
            enableSwipe={true}
            height={200}
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

  async function getBooks() {
    await epubService
      .teste({ token: user.token })
      .then((resp: any) => {
        setMyBooks(resp.data);

        setInitialBooks(resp.data);
        setVisible(true);
      })
      .catch((e) => {
        console.log("deu ruim", e);
        setVisible(true);
      });
    // await bookService
    //   .getBooksDashboard({
    //     favoritos: user,
    //     categorias: listCategorias,
    //     token: user.token,
    //   })
    //   .then((resp) => {
    //     setMyBooks(resp[0].data);
    //     console.log("teste: ", resp);
    //     setInitialBooks(resp[1].data);
    //     setVisible(true);
    //   })
    //   .catch(() => {
    //     setVisible(true);
    //   });
  }

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground style={{ flex: 1 }} source={background}>
        <View style={{ height: 200, marginTop: 0 }}>{renderHeader()}</View>

        <ScrollView style={{ marginTop: 12, marginBottom: 50 }}>
          {/* {myBooks.length > 0 ? ( */}
          <View>{renderMyBookSection(myBooks)}</View>
          {/* ) : (
            <></>
          )} */}
        </ScrollView>
        {visible ? <></> : <LoaderPage />}
      </ImageBackground>
    </View>
  );
};

export default Dashboard;
