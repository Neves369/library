import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../screens/dashboard';
import Detalhes from '../screens/detalhes';

const AppStack = createNativeStackNavigator();

const AppRoutes: React.FC = () =>{

    return(
        <AppStack.Navigator
            screenOptions={{headerShown: false}}
        > 
            <AppStack.Screen name="Dashboard" component={Dashboard} />
            <AppStack.Screen name="Detalhes" component={Detalhes} />
        </AppStack.Navigator>
    )
};

export default AppRoutes;