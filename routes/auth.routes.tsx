import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Cadastrar from "../screens/login/Cadastrar";
import Entrar from "../screens/login/Entrar";
import AppRoutes from "./app.routes";

const AuthRoutes: React.FC = () => {
  const AuthStack = createNativeStackNavigator();

  return (
    <AuthStack.Navigator
      initialRouteName="Entrar"
      screenOptions={{ headerShown: false }}
    >
      <AuthStack.Screen name="Entrar" component={Entrar} />
      <AuthStack.Screen name="Cadastrar" component={Cadastrar} />
    </AuthStack.Navigator>
  );
};

export default AuthRoutes;
