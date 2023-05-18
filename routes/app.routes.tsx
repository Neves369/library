import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Configuracoes from "../screens/configuracoes";
import ListaLivros from "../screens/listaLivros";
import Categorias from "../screens/categorias";
import Dashboard from "../screens/dashboard";
import Detalhes from "../screens/detalhes";
import React from "react";

const AppStack = createNativeStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Dashboard" component={Dashboard} />
      <AppStack.Screen name="ListaLivros" component={ListaLivros} />
      <AppStack.Screen name="Detalhes" component={Detalhes} />
      <AppStack.Screen name="Configuracoes" component={Configuracoes} />
      <AppStack.Screen name="Categorias" component={Categorias} />
    </AppStack.Navigator>
  );
};

export default AppRoutes;
