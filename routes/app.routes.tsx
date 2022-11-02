import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../screens/dashboard';
import ListaLivros from '../screens/listaLivros';
import Detalhes from '../screens/detalhes';
import Configuracoes from "../screens/configuracoes";
import Categorias from "../screens/categorias";

const AppStack = createNativeStackNavigator();

const AppRoutes: React.FC = () =>{

    return(
        <AppStack.Navigator
            screenOptions={{headerShown: false}}
        > 
            <AppStack.Screen name="Dashboard" component={Dashboard} />
            <AppStack.Screen name="ListaLivros" component={ListaLivros} />
            <AppStack.Screen name="Detalhes" component={Detalhes} />
            <AppStack.Screen name="Configuracoes" component={Configuracoes} />
            <AppStack.Screen name="Categorias" component={Categorias} />
        </AppStack.Navigator>
    )
};

export default AppRoutes;