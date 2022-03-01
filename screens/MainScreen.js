import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MainScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo.png")} />
      <Text style={styles.heading}>Garbage Collection System</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={[styles.button, styles.buttonRegister]}
        >
          <Text style={styles.buttonRegisterText}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
  },
  logo: {
    marginTop: 50,
    height: 50,
    width: 50,
    marginVertical: 20,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 90,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonRegister: {
    backgroundColor: "#dc2626",
    marginTop: 5,
    borderColor: "#dc2626",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonRegisterText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
