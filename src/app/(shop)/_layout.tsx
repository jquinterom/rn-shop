import { Tabs } from "expo-router";
import { ComponentProps } from "react";
import { Platform, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

function TabBarIcons(pops: {
  name: ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return (
    <FontAwesome
      name={pops.name}
      size={24}
      color={pops.color}
      style={{ color: "#1BC464" }}
    />
  );
}

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#1BC464",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: { fontSize: 12 },
        headerShown: false,
        tabBarStyle: {
          paddingTop: Platform.OS === "ios" ? 10 : 0,
          height: Platform.OS === "ios" ? 60 : 50,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Shop",
          tabBarIcon: (props) => (
            <TabBarIcons name="shopping-cart" {...props} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          tabBarIcon: (props) => <TabBarIcons name="book" {...props} />,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({});
