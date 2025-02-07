import { SafeAreaProvider } from "react-native-safe-area-context";
import Main from "../components/Main";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />

      <Main>
        <Stack screenOptions={{ headerShown: true }}>
          <Stack.Screen
            name="(shop)"
            options={{ headerShown: false, title: "Shop" }}
          />

          <Stack.Screen
            name="categories"
            options={{ headerShown: true, title: "Categories" }}
          />

          <Stack.Screen
            name="product"
            options={{ headerShown: true, title: "Product" }}
          />

          <Stack.Screen
            name="cart"
            options={{ presentation: "modal", title: "Shopping Cart" }}
          />

          <Stack.Screen name="auth" options={{ headerShown: false }} />
        </Stack>
      </Main>
    </SafeAreaProvider>
  );
}
