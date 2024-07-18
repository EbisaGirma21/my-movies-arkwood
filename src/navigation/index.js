import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Home from "../screen/home";
import Saved from "../screen/saved";
import WelcomeScreen from "../screen/welcome-screen";
import Notification from "../screen/notification";
import DetailScreen from "../screen/movie";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  function HomeStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Welcome"
      >
        <Stack.Screen name="HomeTab" component={HomeTabs} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    );
  }

  function HomeTabs() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,

          tabBarIcon: ({ focused }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home-outline";
            } else if (route.name === "Saved") {
              iconName = "bookmark-outline";
            } else if (route.name === "Notification") {
              iconName = "notifications-outline";
            }

            const customizeSize = 30;

            return (
              <Ionicons
                name={iconName}
                size={customizeSize}
                color={focused ? "#4F46E5" : "#4F46E5"}
              />
            );
          },
          tabBarActiveTintColor: "#4F46E5",
          tabBarActiveBackgroundColor: "#D4D1FF",
          tabBarLabelStyle: {
            fontWeight: "700",
            marginBottom: 5,
          },

          tabBarStyle: {
            backgroundColor: "#ffffff",
            borderTopWidth: 0,
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Saved" component={Saved} />
        <Tab.Screen name="Notification" component={Notification} />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
}
