import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

const CheckerScreen = () => {
  return (
    <SafeAreaView>
      <View style={tw`my-8 flex items-center justify-center`}>
        <Text style={tw`text-2xl font-bold`}>My Garbage Checker</Text>
      </View>
      <View style={tw`flex items-center justify-center`}>
        <Image
          source={require("../assets/images/tick.jpg")}
          style={{ height: 150, width: 150 }}
        />
      </View>
      <Text style={tw`text-xl text-center mt-8`}>
        Your garbage has been collected on {new Date().toLocaleString()}
      </Text>
    </SafeAreaView>
  );
};

export default CheckerScreen;

const styles = StyleSheet.create({});
