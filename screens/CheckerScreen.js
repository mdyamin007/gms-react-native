import { onAuthStateChanged } from "@firebase/auth";
import { get, ref } from "@firebase/database";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { auth, database } from "../firebase";

const CheckerScreen = () => {
  const [garbageCollected, setGarbageCollected] = useState();

  useEffect(() => {
    (async () => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          get(ref(database, "users/" + user.uid)).then((snapshot) => {
            if (snapshot.exists()) {
              const userData = snapshot.val();
              setGarbageCollected(userData.garbageCollected);
            } else {
              console.log("Error occurred!");
            }
          });
        }
      });
      return unsubscribe;
    })();
  }, []);

  return (
    <>
      {garbageCollected && (
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
      )}
      {!garbageCollected && (
        <SafeAreaView>
          <View style={tw`my-8 flex items-center justify-center`}>
            <Text style={tw`text-2xl font-bold`}>My Garbage Checker</Text>
          </View>
          <View style={tw`flex items-center justify-center`}>
            <Image
              source={require("../assets/images/cross_mark.png")}
              style={{ height: 150, width: 150 }}
            />
          </View>
          <Text style={tw`text-xl text-center mt-8`}>
            Your garbage is not collected yet!
          </Text>
        </SafeAreaView>
      )}
    </>
  );
};

export default CheckerScreen;

const styles = StyleSheet.create({});
