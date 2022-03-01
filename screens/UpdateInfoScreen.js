import React from "react";
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";

const UpdateInfoScreen = () => {
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <View style={tw`flex items-center mt-6`}>
        <Text style={tw`text-2xl font-bold text-yellow-600`}>
          Update Information
        </Text>
      </View>
      <View style={tw`p-4`}>
        <View style={tw`mb-4`}>
          <Text>Full Name:</Text>
          <TextInput
            style={tw`px-4 py-2 border rounded`}
            placeholder="Nishat Airin"
          />
        </View>
        <View style={tw`mb-4`}>
          <Text>Email:</Text>
          <TextInput
            style={tw`px-4 py-2 border rounded`}
            placeholder="abc@gmail.com"
          />
        </View>
        <View style={tw`mb-4`}>
          <Text>Address:</Text>
          <TextInput style={tw`px-4 py-2 border rounded`} />
        </View>
        <View style={tw`mb-4`}>
          <Text>Old Password:</Text>
          <TextInput
            style={tw`px-4 py-2 border rounded`}
            placeholder="******"
            secureTextEntry
          />
        </View>
        <View style={tw`mb-4`}>
          <Text>New Password:</Text>
          <TextInput
            style={tw`px-4 py-2 border rounded`}
            placeholder="******"
            secureTextEntry
          />
        </View>
        <View style={tw`flex justify-center items-center`}>
          <TouchableOpacity style={tw`px-6 py-4 bg-yellow-600 rounded-full`}>
            <Text style={tw`text-white text-md font-bold`}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateInfoScreen;

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
