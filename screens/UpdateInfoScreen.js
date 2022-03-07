import React, { useState, useEffect } from "react";
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
import * as Location from "expo-location";
import { onAuthStateChanged } from "firebase/auth";
import { auth, database } from "../firebase";
import { set, get, ref } from "@firebase/database";

const UpdateInfoScreen = () => {
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [location, setLocation] = useState();
  const [uid, setUid] = useState();
  const [userType, setUserType] = useState();
  const [garbageCollected, setGarbageCollected] = useState();

  useEffect(() => {
    (async () => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          get(ref(database, "users/" + user.uid)).then((snapshot) => {
            if (snapshot.exists()) {
              const userData = snapshot.val();
              setFullName(userData.fullName);
              setEmail(userData.email);
              setUid(user.uid);
              setUserType(userData.userType);
              setGarbageCollected(userData.garbageCollected);
            } else {
              console.log("Error occurred!");
            }
          });
        }
      });
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      return unsubscribe;
    })();
  }, []);

  const handleUpdate = () => {
    set(ref(database, "users/" + uid), {
      location,
      email,
      fullName,
      userType,
      uid,
      garbageCollected,
    });
  };

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
            value={fullName}
            onChangeText={(newText) => setFullName(newText)}
          />
        </View>
        <View style={tw`mb-4`}>
          <Text>Email:</Text>
          <TextInput
            style={tw`px-4 py-2 border rounded`}
            value={email}
            editable={false}
          />
        </View>
        <View style={tw`mb-4`}>
          <Text>Address:</Text>
          <TextInput
            value={JSON.stringify(location)}
            style={tw`px-4 py-2 border rounded`}
          />
        </View>
        <View style={tw`flex justify-center items-center`}>
          <TouchableOpacity
            onPress={handleUpdate}
            style={tw`px-6 py-4 bg-yellow-600 rounded-full`}
          >
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
