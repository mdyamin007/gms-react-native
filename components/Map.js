import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { mapStyle } from "../constants/mapStyle";

const Map = () => {
  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        customMapStyle={mapStyle}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      ></MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({});
