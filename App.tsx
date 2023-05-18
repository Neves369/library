import Routes from "./routes";
import { AuthProvider } from "./contexts/auth";
import { StatusBar, View } from "react-native";
import React, { useEffect, useState } from "react";
import LoaderPage from "./components/Loader/LoaderPage";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <NavigationContainer theme={DarkTheme}>
      <StatusBar translucent backgroundColor="transparent" />
      <AuthProvider>
        <PaperProvider>
          <SafeAreaProvider>
            {loading ? (
              <View style={{ flex: 1, backgroundColor: "#000" }}>
                <LoaderPage />
              </View>
            ) : (
              <Routes />
            )}
          </SafeAreaProvider>
        </PaperProvider>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
