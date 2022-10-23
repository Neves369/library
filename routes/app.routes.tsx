import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../screens/dashboard';
import Todos from '../screens/TodosLivros';
import Detalhes from '../screens/detalhes';
import Configuracoes from "../screens/configuracoes";

const AppStack = createNativeStackNavigator();

const AppRoutes: React.FC = () =>{

    return(
        <AppStack.Navigator
            screenOptions={{headerShown: false}}
        > 
            <AppStack.Screen name="Dashboard" component={Dashboard} />
            <AppStack.Screen name="Todos" component={Todos} />
            <AppStack.Screen name="Detalhes" component={Detalhes} />
            <AppStack.Screen name="Configuracoes" component={Configuracoes} />
        </AppStack.Navigator>
    )
};

export default AppRoutes;