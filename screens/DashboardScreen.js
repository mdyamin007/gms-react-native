import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { get, ref } from "@firebase/database";
import { auth, database } from "../firebase";
import HomeScreen from "./HomeScreen";
import AdminScreen from "./AdminScreen";
import tw from "twrnc";

const DashboardScreen = () => {
  const [userType, setUserType] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        get(ref(database, "users/" + user.uid)).then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            setUserType(userData.userType);
          } else {
            console.log("Error occurred!");
          }
        });
      }
    });
    setLoading(false);
    return unsubscribe;
  }, []);

  if (loading) {
    return <Text style={tw`flex justify-center items-center`}>Loading...</Text>;
  }

  if (!loading && userType === "collector") {
    return <AdminScreen />;
  }
  return <HomeScreen />;
};

export default DashboardScreen;
