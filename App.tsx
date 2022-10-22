import React from "react";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { AuthProvider } from "./contexts/auth";
import { Provider as PaperProvider } from "react-native-paper";
import Routes from "./routes";
import { SafeAreaProvider } from "react-native-safe-area-context";

const App: React.FC = () => {
  return (
    <NavigationContainer theme={DarkTheme}>
      <StatusBar translucent backgroundColor="transparent" />
      <AuthProvider>
        <PaperProvider>
          <SafeAreaProvider>
            <Routes />
          </SafeAreaProvider>
        </PaperProvider>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
