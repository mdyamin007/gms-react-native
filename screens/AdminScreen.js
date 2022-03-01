import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../firebase";
import tw from "twrnc";

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../assets/images/google-map.png")}
        resizeMode="cover"
      >
        <Text style={tw`text-center text-blue-600 mb-10 font-bold text-3xl`}>
          Collector Panel
        </Text>
        <View style={tw`flex flex-row flex-wrap items-center justify-center`}>
          <TouchableOpacity
            onPress={() => navigation.navigate("LocateGarbage")}
            style={tw`flex justify-center items-center mx-4 my-4 p-4 bg-yellow-500 h-32 w-32 rounded-2xl`}
          >
            <Text style={tw`text-xl text-white font-bold text-center`}>
              Garbage Locator
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("MyGarbageChecker")}
            style={tw`flex justify-center items-center mx-4 my-4 p-4 bg-yellow-500 h-32 w-32 rounded-2xl`}
          >
            <Text style={tw`text-xl text-white font-bold text-center`}>
              Garbage Collection Checking
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Payment")}
            style={tw`flex justify-center items-center mx-4 my-4 p-4 bg-yellow-500 h-32 w-32 rounded-2xl`}
          >
            <Text style={tw`text-xl text-white font-bold text-center`}>
              Cash Collection
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("UpdateInfo")}
            style={tw`flex justify-center items-center mx-4 my-4 p-4 bg-yellow-500 h-32 w-32 rounded-2xl`}
          >
            <Text style={tw`text-xl text-white font-bold text-center`}>
              Update Info.
            </Text>
          </TouchableOpacity>
        </View>
        <View style={tw`mt-10 items-center`}>
          <TouchableOpacity
            style={tw`px-2 py-2 bg-red-600 rounded-md w-20 text-white font-bold`}
            onPress={handleLogout}
          >
            <Text style={tw`text-base text-white font-bold text-center`}>
              Log out
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
  },
});
