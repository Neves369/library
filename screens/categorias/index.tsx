import React, { useState, useEffect, useContext } from "react";
import pageFilledIcon from "../../assets/icons/page_filled_icon.png";
import bookmarkIcon from "../../assets/icons/mark_icon.png";
import readIcon from "../../assets/icons/read_icon.png";
import background from "../../assets/background.png";
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
  Ionicons
} from "@expo/vector-icons";
import AuthContext from "../../contexts/auth";

const Categorias: React.FC = ({ navigation }: any) => {



  const categorias = [
    {
      id: 1,
      titulo: "Best Seller",
      categoria: "best-seller"
    },
    {
      id: 2,
      titulo: "Clássicos",
      categoria: "classico"
    },
    {
      id: 3,
      titulo: "Lançamentos",
      categoria: "lancamento"
    },
    {
      id: 4,
      titulo: "Autoajuda",
      categoria: "autoajuda"
    },
    {
      id: 5,
      titulo: "Biografias",
      categoria: "biografia"
    },
    {
      id: 6,
      titulo: "Crime",
      categoria: "crime"
    },
    {
      id: 7,
      titulo: "Educação",
      categoria: "educacao"
    },
    {
      id: 8,
      titulo: "Fantasia",
      categoria: "fantasia"
    },
    {
      id: 9,
      titulo: "Gastronomia",
      categoria: "gastronomia"
    },
    {
      id: 10,
      titulo: "História",
      categoria: "historia"
    },
    {
      id: 11,
      titulo: "HQ's",
      categoria: "hq"
    },
    {
      id: 12,
      titulo: "Infantil",
      categoria: "infantil"
    },
    {
      id: 13,
      titulo: "Literatura",
      categoria: "literatura"
    },
    {
      id: 14,
      titulo: "Profissional",
      categoria: "profissional"
    },
    {
      id: 15,
      titulo: "Religião",
      categoria: "religiao"
    },
    {
      id: 16,
      titulo: "Romance",
      categoria: "romance"
    },
  ];

  const { user, signIn, changeLogando } = useContext(AuthContext);

  useEffect(() => {

  }, [])
  

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
          {/* Claim */}
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 10,
            }}
            onPress={() => navigation.navigate('Dashboard')}
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
          >
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
          >
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderCategoryData() {
    
    const renderItem = ({ item }: any) => {
      return (
        <View style={{ width: '100%', marginVertical: 2}}>
          <TouchableOpacity
            style={{ 
              width: '100%', 
              flexDirection: "row", 
              paddingVertical: 10, 
              paddingHorizontal: 5,
              backgroundColor: 'rgba(100, 100, 100, 0.4)',
              borderRadius: 8 
            }}
            onPress={() =>
              navigation.navigate("Detalhes", {
                book: item,
              })
            }
          >
            <Text
              numberOfLines={1}
              style={{
                fontSize: 22,
                lineHeight: 30,
                color: "#E7E7E7",
                width: '80%',
              }}
            >
              {item.titulo}
            </Text>
            <Ionicons name="ios-arrow-redo" size={24} color="white" />
          </TouchableOpacity>
        </View>
      );
    };

    return (
      <View style={{ flex: 1}}>
        <FlatList
          data={categorias}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{alignItems: 'center'}}
        />
      </View>
    );
  }

  return (
    <Container>
      <Fundo source={background}>
        <Header>
          {renderHeader()}
          {renderButtonSection()}
        </Header>

        <ScrollView style={{ marginBottom: 50 }}>
          <View>{renderCategoryData()}</View>
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

          <ScreenButtom
            onPress={()=>{navigation.navigate("Configuracoes")}}
          >
            <Entypo name="menu" size={28} color="#64676D" />
          </ScreenButtom>
        </Menu>
      </Fundo>
    </Container>
  );
};

export default Categorias;
