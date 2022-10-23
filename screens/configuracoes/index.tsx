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

const Configuracoes: React.FC = ({ navigation }: any) => {
  const profileData = {
    name: "Usuário Teste",
    point: 200,
  };

  const [visible, setVisible] = useState(false);
  const [profile, setProfile] = useState(profileData);
  const [myBooks, setMyBooks] = useState(Books.books);
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
         
        </View>
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
            
          </View>
        </ScrollView>

        <Menu>
          <ScreenButtom
            onPress={()=>{navigation.navigate("Dashboard")}}
          >
            <MaterialCommunityIcons
              name="view-dashboard"
              size={28}
              color="#64676D"
            />
          </ScreenButtom>

          <ScreenButtom>
            <FontAwesome name="search" size={28} color="#64676D" />
          </ScreenButtom>

          <ScreenButtom>
            <Fontisto name="world-o" size={28} color="#64676D" />
          </ScreenButtom>

          <ScreenButtom>
            <Entypo name="menu" size={28} color="#E7E7E7" />
          </ScreenButtom>
        </Menu>
      </Fundo>
    </Container>
  );
};

export default Configuracoes;
