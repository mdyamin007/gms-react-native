import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import tw from "twrnc";
import { mapStyle } from "../constants/mapStyle";
import { onAuthStateChanged } from "@firebase/auth";
import { child, get, ref } from "@firebase/database";
import { auth, database } from "../firebase";

const LocateVan = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [collectorList, setCollectorList] = useState([]);
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
      let collectors = [];
      get(child(ref(database), "collectors")).then((snapshot) => {
        // console.log(snapshot);
        snapshot.forEach((childSnapshot) => {
          // console.log(childSnapshot);
          collectors.push(childSnapshot);
          // console.log(collectors);
        });
      });
      setCollectorList(collectors);
      // console.log(collectorList);
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
              title={"My House"}
              description={"This is your house location"}
            />
            {collectorList &&
              collectorList.map((collector, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: collector.val().location.coords.latitude,
                    longitude: collector.val().location.coords.longitude,
                  }}
                  title={collector.val().fullName}
                  description={collector.val().email}
                  pinColor="green"
                />
              ))}
          </MapView>
        </View>
      )}
    </>
  );
};

export default LocateVan;
