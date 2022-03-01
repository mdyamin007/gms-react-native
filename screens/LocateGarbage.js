import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import tw from "twrnc";
import { mapStyle } from "../constants/mapStyle";
import { onAuthStateChanged } from "@firebase/auth";
import { child, get, ref } from "@firebase/database";
import { auth, database } from "../firebase";

const LocateGarbage = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ((async) => {
      setLoading(true);
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          get(ref(database, "users/" + user.uid)).then((snapshot) => {
            if (snapshot.exists()) {
              const userData = snapshot.val();
              setUserLocation(userData.location);
              // console.log(userLocation);
            } else {
              console.log("Error occurred!");
            }
          });
        }
      });
      setLoading(false);
      let users = [];
      get(child(ref(database), "houseOwners")).then((snapshot) => {
        // console.log(snapshot);
        snapshot.forEach((childSnapshot) => {
          // console.log(childSnapshot);
          users.push(childSnapshot);
          // console.log(users);
        });
      });
      setUserList(users);
      // console.log(userList);
      return unsubscribe;
    })();
  }, []);

  return (
    <>
      {loading && <Text>Loading...</Text>}
      {!loading && userLocation && (
        <View style={{ flex: 1 }}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            customMapStyle={mapStyle}
            initialRegion={{
              latitude: userLocation?.coords?.latitude,
              longitude: userLocation?.coords?.longitude,
              latitudeDelta: 0.04,
              longitudeDelta: 0.05,
            }}
          >
            <Marker
              coordinate={{
                latitude: userLocation?.coords?.latitude,
                longitude: userLocation?.coords?.longitude,
              }}
              pinColor="indigo"
              title={"My House"}
              description={"This is your house location"}
            />
            {userList &&
              userList.map((user, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: user.val().location.coords.latitude,
                    longitude: user.val().location.coords.longitude,
                  }}
                  title={user.val().fullName}
                  description={user.val().email}
                  pinColor="red"
                />
              ))}
          </MapView>
        </View>
      )}
    </>
  );
};

export default LocateGarbage;
