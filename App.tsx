import { useEffect } from "react";
import { View } from "react-native";
import { ThemeProvider, DarkTheme, NavigationContainer } from "@react-navigation/native";
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';
import { Provider } from "react-redux";
import { store } from "@/store/store";
import RootNavigator from "./navigators/RootNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from "expo-font";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false
});

const App = () => {

  const [loaded] = useFonts({
    "space": require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      // Hide the splash screen
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000000" }}>
      <ThemeProvider value={DarkTheme}>
          <Provider store={store}>
              <NavigationContainer>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <RootNavigator />
                </GestureHandlerRootView>
              </NavigationContainer>
          </Provider>
      </ThemeProvider>
    </View>
  );
}

export default App;