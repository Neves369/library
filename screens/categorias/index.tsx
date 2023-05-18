import background from "../../assets/background.png";
import React, { useEffect, useContext } from "react";
import AuthContext from "../../contexts/auth";

import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import {
  Entypo,
  Fontisto,
  Ionicons,
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
  Foundation,
  FontAwesome5,
} from "@expo/vector-icons";
import LineDivider from "../../components/Divider/LineDivider";

const Categorias: React.FC = ({ navigation }: any) => {
  const categorias = [
    {
      id: 1,
      titulo: "Best Seller",
      categoria: "best-seller",
    },
    {
      id: 2,
      titulo: "Clássicos",
      categoria: "classico",
    },
    {
      id: 3,
      titulo: "Lançamentos",
      categoria: "lancamento",
    },
    {
      id: 4,
      titulo: "Autoajuda",
      categoria: "autoajuda",
    },
    {
      id: 5,
      titulo: "Biografias",
      categoria: "biografia",
    },
    {
      id: 6,
      titulo: "Crime",
      categoria: "crime",
    },
    {
      id: 7,
      titulo: "Educação",
      categoria: "educacao",
    },
    {
      id: 8,
      titulo: "Fantasia",
      categoria: "fantasia",
    },
    {
      id: 9,
      titulo: "Gastronomia",
      categoria: "gastronomia",
    },
    {
      id: 10,
      titulo: "História",
      categoria: "historia",
    },
    {
      id: 11,
      titulo: "HQ's",
      categoria: "hq",
    },
    {
      id: 12,
      titulo: "Infantil",
      categoria: "infantil",
    },
    {
      id: 13,
      titulo: "Literatura",
      categoria: "literatura",
    },
    {
      id: 14,
      titulo: "Profissional",
      categoria: "profissional",
    },
    {
      id: 15,
      titulo: "Religião",
      categoria: "religiao",
    },
    {
      id: 16,
      titulo: "Romance",
      categoria: "romance",
    },
  ];

  const { user }: any = useContext(AuthContext);

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
          {/* Claim */}
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
            onPress={() => {}}
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
        <View style={{ width: "100%", marginVertical: 2 }}>
          <TouchableOpacity
            style={{
              width: "100%",
              flexDirection: "row",
              paddingVertical: 10,
              paddingHorizontal: 5,
              backgroundColor: "rgba(100, 100, 100, 0.4)",
              borderRadius: 8,
            }}
            onPress={() =>
              navigation.navigate("ListaLivros", { categoria: item.categoria })
            }
          >
            <Text
              numberOfLines={1}
              style={{
                fontSize: 22,
                lineHeight: 30,
                color: "#E7E7E7",
                width: "80%",
                paddingLeft: 10,
              }}
            >
              {item.titulo}
            </Text>
            {/* <Ionicons name="ios-arrow-redo" size={24} color="white" /> */}
          </TouchableOpacity>
        </View>
      );
    };

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={categorias}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: "center" }}
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

        <ScrollView style={{ marginBottom: 50 }}>
          <View>{renderCategoryData()}</View>
        </ScrollView>

        {renderMenu()}
      </ImageBackground>
    </View>
  );
};

export default Categorias;
