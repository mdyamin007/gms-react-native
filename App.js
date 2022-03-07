import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import AdminScreen from "./screens/AdminScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import MainScreen from "./screens/MainScreen";
import PaymentScreen from "./screens/PaymentScreen";
import UpdateInfoScreen from "./screens/UpdateInfoScreen";
import CheckerScreen from "./screens/CheckerScreen";
import AuthProvider from "./contexts/AuthProvider";
import LocateVan from "./screens/LocateVan";
import DashboardScreen from "./screens/DashboardScreen";
import LocateGarbage from "./screens/LocateGarbage";
import CashCollectionScreen from "./screens/CashCollectionScreen";
import GarbageCollectionCheckingScreen from "./screens/GarbageCollectionCheckingScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Main"
          component={MainScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegisterScreen}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LocateGarbageVan"
          component={LocateVan}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UpdateInfo"
          component={UpdateInfoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyGarbageChecker"
          component={CheckerScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Admin"
          component={AdminScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="LocateGarbage"
          component={LocateGarbage}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="CashCollection"
          component={CashCollectionScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="GarbageCollectionChecking"
          component={GarbageCollectionCheckingScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
