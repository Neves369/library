import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Cadastrar from "../screens/login/Cadastrar";
import Entrar from "../screens/login/Entrar";
import EntrarCom from "../screens/login/EntrarCom";
import EsqueciASenha from "../screens/login/EsqueciASenha";
import AppRoutes from "./app.routes";

const AuthRoutes: React.FC = () => {
  const AuthStack = createNativeStackNavigator();

  return (
    <AuthStack.Navigator
      initialRouteName="EntrarCom"
      screenOptions={{ headerShown: false }}
    >
       <AuthStack.Screen name="EntrarCom" component={EntrarCom} />
      <AuthStack.Screen name="Entrar" component={Entrar} />
      <AuthStack.Screen name="Cadastrar" component={Cadastrar} />
      <AuthStack.Screen name="EsqueciASenha" component={EsqueciASenha} />
    </AuthStack.Navigator>
  );
};

export default AuthRoutes;
