import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { child, get, ref, set } from "@firebase/database";
import { database } from "../firebase";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import Checkbox from "expo-checkbox";
import { useNavigation } from "@react-navigation/core";

const GarbageCollectionCheckingScreen = () => {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      setLoading(true);
      await get(child(ref(database), "users")).then((snapshot) => {
        // console.log(snapshot);
        let userList = [];
        snapshot.forEach((childSnapshot) => {
          // console.log(childSnapshot);
          userList.push(childSnapshot);
        });
        userList = userList.filter((user) => {
          // console.log(user.val().userType);

          return user.val().userType === "user";
        });
        console.log(userList);
        setUsers(userList);
      });
      setLoading(false);
    })();
  }, []);

  const setChecked = (user) => {
    console.log(user);
    set(ref(database, "users/" + user.uid), {
      location: user.location,
      email: user.email,
      fullName: user.fullName,
      userType: user.userType,
      uid: user.uid,
      garbageCollected: !user.garbageCollected,
    });
    if (!user.garbageCollected) alert("Garbage Collected, Thank you!");
    navigation.replace("Admin");
  };

  return (
    <SafeAreaView style={tw`flex p-2`}>
      <ScrollView>
        {!loading &&
          users &&
          users.map((user, index) => (
            <View
              key={index}
              style={tw`flex bg-yellow-400 p-4 m-2 rounded-lg shadow-lg`}
            >
              <Text style={tw`text-white text-lg`}>
                Email: {user.val().email}
              </Text>
              <Text>
                Status:
                <View style={tw`pl-2 pt-2`}>
                  <Checkbox
                    onValueChange={() => setChecked(user.val())}
                    value={
                      user.val().garbageCollected.toString() === "true"
                        ? true
                        : false
                    }
                  />
                </View>
              </Text>
            </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default GarbageCollectionCheckingScreen;
